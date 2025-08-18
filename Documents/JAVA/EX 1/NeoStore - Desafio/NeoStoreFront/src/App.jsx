import React from "react"
import { useEffect, useState } from "react"
import styled, { createGlobalStyle } from "styled-components";

import FornecedorService from "./services/FornecedorService";
import FornecedorList from "./components/FornecedorList";
import FornecedorForm from "./components/FornecedorForm";
import Navbar from "./components/Navbar";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f2f5;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #ffffff; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 

  h1, h2 {
    text-align: center; 
  }
`;

const PaginationContainer = styled.div`
  margin-top: 25px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #180550ff;
  background-color: #180550ff;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const PageIndicator = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #555;
`;

function App() {

  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorParaEditar, setFornecedorParaEditar] = useState(null);
  
  const [paginaAtual, setPaginaAtual] = useState(1);

  const buscarFornecedores = async (pagina) => {

    try {

      const response = await FornecedorService.getAll(pagina, 5); // Limite fixo em 5
      setFornecedores(response.data);

    } catch (error) {

      console.error('Erro ao buscar fornecedores:', error);

    }
  };

  useEffect(() => {

    buscarFornecedores(paginaAtual);

  }, [paginaAtual]); 

  const handleAdicionarFornecedor = async (novoFornecedor) => {

    try {

      await FornecedorService.create(novoFornecedor);
      alert('Fornecedor adicionado com sucesso!');

      buscarFornecedores(paginaAtual);

    } catch (error) {

      console.error('Erro ao criar fornecedor:', error);
      alert('Erro ao criar fornecedor. Verifique o console.');

    }
  };

  const handleAtualizarFornecedor = async (id, dadosAtualizados) => {

    try {

      await FornecedorService.update(id, dadosAtualizados);
      setFornecedorParaEditar(null);

      alert('Fornecedor atualizado com sucesso!');

      buscarFornecedores(paginaAtual);

    } catch (error) {

      console.error('Erro ao atualizar fornecedor:', error);

      alert('Erro ao atualizar fornecedor.');

    }
  };

  const handleDeletarFornecedor = async (id) => {

    try {

      if (window.confirm('Tem a certeza de que deseja deletar este fornecedor?')) {

        await FornecedorService.delete(id);
        alert('Fornecedor deletado com sucesso!');

        buscarFornecedores(paginaAtual);
      }

    } catch (error) {

      console.error('Erro ao deletar fornecedor:', error);
      alert('Erro ao deletar fornecedor. Verifique o console.');

    }
  };

  const handleEditar = (fornecedor) => {
    setFornecedorParaEditar(fornecedor);
  };

  const handleCancelarEdicao = () => {
    setFornecedorParaEditar(null);
  };

  const handlePaginaAnterior = () => {

    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }

  };

  const handleProximaPagina = () => {

    if (fornecedores.length === 5) {
      setPaginaAtual(paginaAtual + 1);
    }

  };

  return (
    <>
    <GlobalStyle></GlobalStyle>
      <AppContainer>
        <Navbar />

        <FornecedorForm
          onFornecedorAdicionado={handleAdicionarFornecedor}
          onFornecedorAtualizado={handleAtualizarFornecedor}
          fornecedorParaEditar={fornecedorParaEditar}
          onCancelarEdicao={handleCancelarEdicao}
        />

        <hr />
        <h2>Lista de Fornecedores</h2>
        <FornecedorList
          fornecedores={fornecedores}
          onDeletar={handleDeletarFornecedor}
          onEditar={handleEditar}
        />

        <PaginationContainer>

          <PageButton onClick={handlePaginaAnterior} disabled={paginaAtual === 1}>
            Anterior
          </PageButton>

          <PageIndicator>Página {paginaAtual}</PageIndicator>
          
          <PageButton onClick={handleProximaPagina} disabled={fornecedores.length < 5}>
            Próxima
          </PageButton>

        </PaginationContainer>

      </AppContainer>
    </>
  );

}

export default App;
