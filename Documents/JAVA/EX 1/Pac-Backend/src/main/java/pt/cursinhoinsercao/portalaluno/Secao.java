package pt.cursinhoinsercao.portalaluno;

import javax.persistence.*;

@Entity
@Table(name = "secoes")
public class Secao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "imagem", length = 70)
    private String imagem;

    @Column(name = "texto", length = 500)
    private String texto;

    public Secao() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }
}
