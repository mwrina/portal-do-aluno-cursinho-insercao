import React from "react";
import styled from "styled-components"

const ListaContainer = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListaItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
    &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

const InfoFornecedor = styled.div`
    display: flex;
    flex-direction: column;
`;

const Actions = styled.div`
    display: flex;
    gap: 10px;
`;

const EditButton = styled.button`
    padding: 5px 10px;
    border: 1px solid #ffc107;
    background-color: transparent;
    color: #ffc107;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
    background-color: #ffc107;
    color: white;
  }
`;

const DeleteButton = styled.button`
    padding: 5px 10px;
    border: 1px solid #dc3545;
    background-color: transparent;
    color: #dc3545;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
    background-color: #dc3545;
    color: white;
  }
`;

function FornecedorList({ fornecedores, onDeletar, onEditar }) {

    if (fornecedores.length === 0) {
        return <p>Nenhum fornecedor cadastrado.</p>;
    }

    return (
        <ListaContainer>
            {fornecedores.map(fornecedor => (
                <ListaItem key={fornecedor.id}>

                    <InfoFornecedor>
                        <strong>{fornecedor.name}</strong>
                        <span>({fornecedor.cnpj})</span>
                    </InfoFornecedor>

                    <Actions>
                        <EditButton
                            onClick={() => onEditar(fornecedor)} 
                            style={{ marginLeft: '10px' }}
                        >
                            Editar
                        </EditButton>

                        <DeleteButton
                            onClick={() => onDeletar(fornecedor.id)}
                            style={{ marginLeft: '10px' }}
                        >
                            Deletar
                        </DeleteButton>
                    </Actions>
                </ListaItem>
            ))}
        </ListaContainer>
    );
}

export default FornecedorList;