package pt.cursinhoinsercao.portalaluno.dao;

import pt.cursinhoinsercao.portalaluno.Secao;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class SecaoDAO {

    //Salva uma nova secao no banco de dados
    public void salvar(Secao secao) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(secao);
            em.getTransaction().commit();
        }finally {
            em.close();
        }
    }

    //Busca uma secao pelo seu ID
    public Secao buscarPorId(int id) {
        EntityManager em = JPAUtil.getEntityManager();
        try{
            return em.find(Secao.class, id);
        }finally {
            em.close();
        }
    }

    //Retorna todas as secoes da base de dados

    public List<Secao> buscarTodos() {
        EntityManager em = JPAUtil.getEntityManager();
        try{
            String jpql = "SELECT secao FROM Secao secao";
            TypedQuery<Secao> query = em.createQuery(jpql, Secao.class);
            return query.getResultList();
        }finally {
            em.close();
        }
    }

    //Remove uma secao da base de dados

    public void remover(Secao secao) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.merge(secao));
            em.getTransaction().commit();
        }finally {
            em.close();
        }
    }


}
