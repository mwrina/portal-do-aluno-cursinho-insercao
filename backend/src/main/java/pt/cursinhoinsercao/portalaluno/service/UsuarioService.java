package pt.cursinhoinsercao.portalaluno.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.cursinhoinsercao.portalaluno.dao.UsuarioDAO;
import pt.cursinhoinsercao.portalaluno.dto.Login;
import pt.cursinhoinsercao.portalaluno.dto.UsuarioDTO;
import pt.cursinhoinsercao.portalaluno.entity.Usuario;
import pt.cursinhoinsercao.portalaluno.util.PasswordUtil;

import java.util.List;

public class UsuarioService {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    private UsuarioDAO usuarioDAO = new UsuarioDAO();
    private TokenService tokenService = new TokenService();

    public Usuario cadastrar(Usuario novoUsuario) throws Exception {

        if (novoUsuario.getEmail() == null || novoUsuario.getEmail().trim().isEmpty()) {
            throw new Exception("Email é obrigatório.");
        }
        if (novoUsuario.getSenha() == null || novoUsuario.getSenha().length() < 6) {
            throw new Exception("A senha deve ter pelo menos 6 caracteres.");
        }
        if (novoUsuario.getNome() == null || novoUsuario.getNome().trim().isEmpty()) {
            throw new Exception("Nome é obrigatório.");
        }

        if (usuarioDAO.buscarPorEmail(novoUsuario.getEmail()) != null) {
            throw new Exception("Este email já está a ser utilizado");
        }

        int tipo = novoUsuario.getTipo();
        if (tipo != 1 && tipo != 2 && tipo != 3) {
            tipo = 3;
            novoUsuario.setTipo(tipo);
        }

        if (tipo == 1) {
            novoUsuario.setAtivo(true);
        } else if (tipo == 2) {
            novoUsuario.setAtivo(false);
        } else {
            novoUsuario.setAtivo(true);
        }

        novoUsuario.setSenha(PasswordUtil.hash(novoUsuario.getSenha()));

        usuarioDAO.salvar(novoUsuario);
        return novoUsuario;
    }

    public String login(Login login) throws Exception {

        Usuario usuario = usuarioDAO.buscarPorEmail(login.getEmail());

        if (usuario == null || !PasswordUtil.verificar(login.getSenha(), usuario.getSenha())) {
            throw new Exception("Email ou senha inválidos.");
        }

        if (!usuario.isAtivo()) {
            throw new Exception("Usuário inativo. Aguarde a aprovação do seu cadastro.");
        }

        return tokenService.gerarToken(usuario);
    }

    public List<Usuario> listarCandidaturasPendentes() {
        return usuarioDAO.listarProfessoresPorStatus(false);
    }

    public List<Usuario> listarEducadoresAtivos() {
        return usuarioDAO.listarProfessoresPorStatus(true);
    }

    public void aprovarCandidatura(int id) {
        Usuario usuario = usuarioDAO.buscarPorId(id);

        if (usuario != null && usuario.getTipo() == 2) {
            usuario.setAtivo(true);
            usuarioDAO.atualizar(usuario);
        }
    }

    public void rejeitarOuRemoverEducador(int id) {
        Usuario usuario = usuarioDAO.buscarPorId(id);
        if (usuario != null) {
            usuarioDAO.remover(usuario);
        }
    }

    public List<Usuario> listarMatriculasPendentes() {
        return usuarioDAO.listarAlunosPorStatus(false);
    }

    public List<Usuario> listarAlunosMatriculados() {
        return usuarioDAO.listarAlunosPorStatus(true);
    }

    public void aprovarMatricula(int id) {
        Usuario usuario = usuarioDAO.buscarPorId(id);
        if (usuario != null && usuario.getTipo() == 3) {
            usuario.setAtivo(true);
            usuarioDAO.atualizar(usuario);
        }
    }

    public void rejeitarOuRemoverAluno(int id) {
        Usuario usuario = usuarioDAO.buscarPorId(id);
        if (usuario != null && usuario.getTipo() == 3) {
            usuarioDAO.remover(usuario);
        }
    }

    public Usuario atualizar(int id, UsuarioDTO dto) throws Exception {
        Usuario usuario = usuarioDAO.buscarPorId(id);

        if (usuario == null) {
            throw new Exception("Usuário não encontrado com o ID: " + id);
        }

        if (dto.getNome() != null && !dto.getNome().trim().isEmpty()) {
            if (dto.getNome().trim().length() < 3) {
                throw new Exception("Nome deve ter pelo menos 3 caracteres.");
            }
            usuario.setNome(dto.getNome());
        }

        if (dto.getEmail() != null && !dto.getEmail().trim().isEmpty()) {
            if (!dto.getEmail().matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
                throw new Exception("Email inválido.");
            }
            if (!dto.getEmail().equals(usuario.getEmail())) {
                Usuario emailExistente = usuarioDAO.buscarPorEmail(dto.getEmail());
                if (emailExistente != null && emailExistente.getId() != id) {
                    throw new Exception("Este email já está a ser utilizado.");
                }
                usuario.setEmail(dto.getEmail());
            }
        }

        if (dto.getSenha() != null && !dto.getSenha().trim().isEmpty()) {
            if (dto.getSenha().length() < 6) {
                throw new Exception("A senha deve ter pelo menos 6 caracteres.");
            }
            usuario.setSenha(PasswordUtil.hash(dto.getSenha()));
        }

        if (dto.getAtivo() != null) {
            usuario.setAtivo(dto.getAtivo());
        }

        usuarioDAO.atualizar(usuario);
        return usuario;
    }
}
