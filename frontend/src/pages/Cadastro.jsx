import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import styled from 'styled-components';
import Navbar from "../components/reused/Navbar";
import Footer from "../components/reused/Footer";
import Botao from "../components/reused/Botao"

// ========== STYLED COMPONENTS (Adaptados do Login) ==========

const Container = styled.div`
  font-family: 'Roboto';
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const RegisterCard = styled.div`
  background-color: #FEF8E9;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 30rem;
  width: 100%;
`;

const Title = styled.h1`
    color: #E23467;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #E23467;
  margin-bottom: 0.25rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 2px solid #0D76B8;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #111827;

  &:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.5);
  }
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 2px solid #0D76B8;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #111827;
  background-color: white;

  &:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.5);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #F2B924;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.125rem;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
  }
`;

const Message = styled.p`
    color: ${props => (props.success ? '#28a745' : '#dc3545')};
    margin-top: 1rem;
    text-align: center;
`;

const LoginLink = styled(Link)`
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #007bff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

// ========== COMPONENTE REACT ==========

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 3
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'tipo' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await api.post('/api/usuarios', formData);

      setIsSuccess(true);
      setMessage('Cadastro realizado com sucesso! A redirecionar para o login...');

      setTimeout(() => {
        navigate('/admin');
      }, 3000);

    } catch (err) {
      console.error("Erro no cadastro:", err);
      setIsSuccess(false);
      setMessage(err.response?.data || 'Erro ao realizar o cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Navbar />
      <Main>
        <RegisterCard>
          <Title>Criar Conta</Title>
          <Form onSubmit={handleSubmit}>

            <InputContainer>
              <Label htmlFor="nome">Nome Completo</Label>
              <FormInput type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label htmlFor="email">E-mail</Label>
              <FormInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label htmlFor="senha">Senha</Label>
              <FormInput type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required minLength={6} />
            </InputContainer>

            <InputContainer>
                <Label htmlFor="tipo">Eu sou</Label>
                <SelectInput id="tipo" name="tipo" value={formData.tipo} onChange={handleChange}>
                    <option value={3}>Aluno</option>
                    <option value={2}>Professor</option>
                </SelectInput>
            </InputContainer>

            
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'A registrar...' : 'Registrar'}
            </SubmitButton>

            {message && <Message success={isSuccess}>{message}</Message>}
          </Form>
          <LoginLink to="/admin">Já tem uma conta? Faça login</LoginLink>
        </RegisterCard>
      </Main>
      <Footer/>
    </Container>
  );
}
