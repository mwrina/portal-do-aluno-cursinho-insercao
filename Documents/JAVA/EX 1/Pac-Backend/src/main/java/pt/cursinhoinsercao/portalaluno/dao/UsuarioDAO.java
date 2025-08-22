package pt.cursinhoinsercao.portalaluno.dao;

import pt.cursinhoinsercao.portalaluno.Usuario;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.List;

public class UsuarioDAO {

    // salva um novo usuário na base de dados

    public void salvar(Usuario usuario) {

        EntityManager em = JPAUtil.getEntityManager();

        try {
            em.getTransaction().begin();
            em.persist(usuario);
            em.getTransaction().commit();

        } finally {
            em.close();
        }
    }

    // busca o user pelo id

    public Usuario buscarPorId(int id) {
        EntityManager em = JPAUtil.getEntityManager();

        try {
            return em.find(Usuario.class, id);
        }finally {
            em.close();
        }
    }

    //busca o user pelo seu email

    public Usuario buscarPorEmail(String email) {
        EntityManager em = JPAUtil.getEntityManager();

        try{
            String jpql = "select u from Usuario u where u.email = :email";
            TypedQuery<Usuario> query = em.createQuery(jpql, Usuario.class);
            query.setParameter("email", email);
            return query.getSingleResult();
        } catch (NoResultException e){
            return null;
        }finally {
            em.close();
        }
    }

    //retorna todos os usuarios da base de dados

    public List<Usuario> buscarTodos() {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            String jpql = "select u from Usuario u";
            TypedQuery<Usuario> query = em.createQuery(jpql, Usuario.class);

            return query.getResultList();
        }finally {
            em.close();
        }
    }

    //atualiza os dados de um usuario existente

    public void atualizar(Usuario usuario) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();

            em.merge(usuario);
            em.getTransaction().commit();
        }finally {
            em.close();
        }
    }

    //remove um usuario da base da dados
    public void remover(Usuario usuario) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.merge(usuario));
            em.getTransaction().commit();
        }finally {
            em.close();
        }
    }
}
