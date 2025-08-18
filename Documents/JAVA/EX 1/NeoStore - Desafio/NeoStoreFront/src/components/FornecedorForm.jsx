import React from "react";
import { useState, useEffect } from "react";
import { IMaskInput } from 'react-imask';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  background-color: #180550ff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

function FornecedorForm({ onFornecedorAdicionado, onFornecedorAtualizado, fornecedorParaEditar, onCancelarEdicao }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {

        if (fornecedorParaEditar) {

            setName(fornecedorParaEditar.name);
            setEmail(fornecedorParaEditar.email);
            setCnpj(fornecedorParaEditar.cnpj);
            setDescription(fornecedorParaEditar.description || '');
        }
        else {
            setName('');
            setEmail('');
            setCnpj('');
            setDescription('');
        }
    }, [fornecedorParaEditar]);

    const handleSubmit = (event) => {

        //recarrega a pagina
        event.preventDefault();
        const dadosDoFornecedor = { name, email, cnpj, description };

        if (fornecedorParaEditar) {
            onFornecedorAtualizado(fornecedorParaEditar.id, dadosDoFornecedor);
        } else {
            onFornecedorAdicionado(dadosDoFornecedor);
        }

    };

    return (
        <FormContainer onSubmit={handleSubmit}>

            <h2>{fornecedorParaEditar ? 'Editar Fornecedor' : 'Adicionar Novo Fornecedor'}</h2>

            <FormGroup>
                <Label>Nome:</Label>
                <Input type="text" placeholder="Nome do Fornecedor" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>

            <FormGroup>
                <Label>Email:</Label>
                <Input type="email" placeholder="Email do Fornecedor" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>

            <FormGroup>
                <Label>CNPJ:</Label>
                <IMaskInput
                    as={Input}
                    mask="00.000.000/0000-00"
                    value={cnpj}
                    unmask={false}
                    onAccept={(value) => setCnpj(value)}
                    placeholder="00.000.000/0000-00"
                    required
                />
            </FormGroup>

            <FormGroup>
                <Label>Descrição:</Label>
                <Input placeholder="Descrição dos produtos/serviços" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>

            <ButtonGroup>
                <Button type="submit">{fornecedorParaEditar ? 'Atualizar' : 'Salvar'}</Button>
                {/*botão de cancelar que só aparece no modo edição*/}
                {fornecedorParaEditar && (
                    <CancelButton type="button" onClick={onCancelarEdicao}>
                        Cancelar
                    </CancelButton>
                )}
            </ButtonGroup>
        </FormContainer>
    )

};

export default FornecedorForm;