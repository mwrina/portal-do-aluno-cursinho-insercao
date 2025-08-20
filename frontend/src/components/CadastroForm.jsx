import { useState } from "react";
import "../styles/cadastroForm.css";

export default function CadastroForm() {

    const [tipo, setTipo] = useState("");

    return (
        <form className="formCadastro">
            <div class="linCampo">
                <p className="nomeCampo">Nome completo</p>
                <input id="nome" className="campo" type="text" placeholder="Digite seu nome e sobrenome"></input>
            </div>
            <div class="linCampo">
                <p className="nomeCampo">E-mail</p>
                <input id="email" className="campo" type="email" placeholder="Digite seu e-mail"></input>
            </div>
            <div class="linCampo">
                <p className="nomeCampo">Telefone</p>
                <input id="tel" className="campo" type="number" placeholder="Digite seu telefone (apenas números)"></input>
            </div>
            <div class="linCampo">
                <p className="nomeCampo">Senha</p>
                <input id="senha" className="campo" type="password" placeholder="Digite sua senha"></input>
            </div>
            <div class="linCampo">
                <p className="nomeCampo">Confirme sua senha</p>
                <input id="confirmSenha" className="campo" type="password" placeholder="Digite novamente a sua senha"></input>
            </div>
            <div className="linCampo">
                <p className="nomeCampo">Como deseja se cadastrar?</p>
                <select id="tipo" className="campo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Selecione</option>
                <option value="1">Estudante</option>
                <option value="2">Educador popular</option>
                </select>
            </div>

            {tipo === "2" && (
                <div className="linCampo">
                <p className="nomeCampo">Qual a sua área do conhecimento?</p>
                <select id="areaConhecimento" className="campo">
                    <option>Ciências da Natureza e Suas Tecnologias</option>
                    <option>Ciências Humanas e Suas Tecnologias</option>
                    <option>linCampoguagens e Suas Tecnologias</option>
                    <option>Matemática e Suas Tecnologias</option>
                    <option>Redação</option>
                </select>
                </div>
            )}

            <button className="botao" type="submit">Cadastrar-se</button>
        </form>
    );
}