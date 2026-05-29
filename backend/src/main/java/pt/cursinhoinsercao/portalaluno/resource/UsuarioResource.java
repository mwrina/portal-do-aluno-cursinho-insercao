package pt.cursinhoinsercao.portalaluno.resource;

import pt.cursinhoinsercao.portalaluno.dto.Login;
import pt.cursinhoinsercao.portalaluno.dto.LoginResponse;
import pt.cursinhoinsercao.portalaluno.dto.UsuarioDTO;
import pt.cursinhoinsercao.portalaluno.entity.Usuario;
import pt.cursinhoinsercao.portalaluno.seguranca.AdminOnly;
import pt.cursinhoinsercao.portalaluno.seguranca.Seguranca;
import pt.cursinhoinsercao.portalaluno.service.UsuarioService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/usuarios")
public class UsuarioResource {

    private UsuarioService usuarioService = new UsuarioService();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response cadastrar(Usuario novoUsuario) {
        try {
            Usuario usuarioCadastrado = usuarioService.cadastrar(novoUsuario);
            return Response.status(Response.Status.CREATED).entity(usuarioCadastrado).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Login login) {
        try {
            String token = usuarioService.login(login);
            LoginResponse resposta = new LoginResponse(token);
            return Response.ok(resposta).build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/professores/pendentes")
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca
    @AdminOnly
    public Response listarCandidaturasPendentes() {
        List<Usuario> candidaturas = usuarioService.listarCandidaturasPendentes();
        return Response.ok(candidaturas).build();
    }

    @GET
    @Path("/professores/ativos")
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca
    @AdminOnly
    public Response listarEducadoresAtivos() {
        List<Usuario> educadores = usuarioService.listarEducadoresAtivos();
        return Response.ok(educadores).build();
    }

    @PUT
    @Path("/{id}/aprovar")
    @Seguranca
    @AdminOnly
    public Response aprovarCandidatura(@PathParam("id") int id) {
        usuarioService.aprovarCandidatura(id);
        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    @Seguranca
    @AdminOnly
    public Response rejeitarOuRemoverEducador(@PathParam("id") int id) {
        usuarioService.rejeitarOuRemoverEducador(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/alunos/pendentes")
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca
    @AdminOnly
    public Response listarMatriculasPendentes() {
        List<Usuario> matriculas = usuarioService.listarMatriculasPendentes();
        return Response.ok(matriculas).build();
    }

    @GET
    @Path("/alunos/matriculados")
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca
    @AdminOnly
    public Response listarAlunosMatriculados() {
        List<Usuario> alunos = usuarioService.listarAlunosMatriculados();
        return Response.ok(alunos).build();
    }

    @PUT
    @Path("/alunos/{id}/aprovar")
    @Seguranca
    @AdminOnly
    public Response aprovarMatricula(@PathParam("id") int id) {
        usuarioService.aprovarMatricula(id);
        return Response.ok().build();
    }

    @DELETE
    @Path("/alunos/{id}")
    @Seguranca
    @AdminOnly
    public Response rejeitarOuRemoverAluno(@PathParam("id") int id) {
        usuarioService.rejeitarOuRemoverAluno(id);
        return Response.noContent().build();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca
    @AdminOnly
    public Response atualizarUsuario(@PathParam("id") int id, UsuarioDTO dto) {
        try {
            Usuario usuarioAtualizado = usuarioService.atualizar(id, dto);
            return Response.ok(usuarioAtualizado).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }
}
