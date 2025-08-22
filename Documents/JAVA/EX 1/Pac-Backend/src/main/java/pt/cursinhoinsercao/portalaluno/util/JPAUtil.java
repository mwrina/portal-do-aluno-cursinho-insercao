package pt.cursinhoinsercao.portalaluno.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAUtil {

    private static EntityManagerFactory FACTORY = Persistence
            .createEntityManagerFactory("portal-aluno-pu");

    public static EntityManager getEntityManager() {
        return FACTORY.createEntityManager();
    }
}
