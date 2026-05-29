import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { api } from "../../services/api";

const fadeIn = keyframes`from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); }`;
const fadeOut = keyframes`from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); }`;

const Div = styled.div`
    display: flex; flex-direction: column; text-align: left;
    align-content: center; padding: 1rem; height: 100%; gap: 10px;
    h1 { margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem; color: #0D76B8; }
`;

const ManagementDiv = styled.section`
    background-color: #FEF8E9; padding: 2rem; border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); margin-bottom: 2rem;
    h2 { margin-top: 0; margin-bottom: 1rem; font-size: 1rem; color: #0D76B8; }
`;

const SearchBar = styled.div`
    display: flex; gap: 1rem; margin-bottom: 1.5rem; width: 100%;
`;

const Input = styled.input`
    flex: 1; padding: 0.7rem; border: 2px solid #0D76B8;
    border-radius: 8px; font-size: 1rem;
`;

const Select = styled.select`
    padding: 0.7rem; border: 2px solid #0D76B8;
    border-radius: 8px; font-size: 1rem; background-color: white;
`;

const ListDiv = styled.div`
    display: flex; flex-direction: column; width: 100%; gap: 1rem;
`;

const Card = styled.div`
    background-color: #FFF; border: 1px solid #0D76B8;
    border-radius: 8px; padding: 1.5rem;
    display: flex; gap: 2rem; justify-content: space-between; align-items: center;
`;

const InfoDiv = styled.div`
    display: flex; flex-direction: column; gap: 0.3rem; flex: 1;
    h3 { margin: 0; font-size: 1rem; color: #333; }
    p { margin: 0; font-size: 0.85rem; color: #666; }
    .email { color: #0D76B8; }
    .tipo-badge {
        display: inline-block; padding: 0.2rem 0.6rem;
        border-radius: 4px; font-size: 0.75rem; font-weight: 600;
        background-color: ${props => props.tipo === 1 ? '#F2B924' : props.tipo === 2 ? '#28a745' : '#0D76B8'};
        color: white;
    }
    .ativo-badge {
        display: inline-block; padding: 0.2rem 0.6rem;
        border-radius: 4px; font-size: 0.75rem; font-weight: 600;
        background-color: ${props => props.ativo ? '#28a745' : '#dc3545'};
        color: white; margin-left: 0.5rem;
    }
`;

const ActionsDiv = styled.div`
    display: flex; gap: 0.5rem;
`;

const Button = styled.button`
    padding: 0.6rem 1.2rem; border: none; font-weight: 600;
    background-color: ${props => props.secondary ? '#6c757d' : (props.danger ? '#dc3545' : '#0D76B8')};
    color: white; border-radius: 5px; cursor: pointer; transition: all 0.2s;
    &:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    &:disabled { background-color: #ccc; cursor: not-allowed; transform: none; }
`;

const ModalOverlay = styled.div`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.5); display: flex;
    justify-content: center; align-items: center; z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white; padding: 2rem; border-radius: 8px;
    width: 90%; max-width: 500px;
`;

const ModalForm = styled.div`
    display: flex; flex-direction: column; gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex; flex-direction: column; gap: 0.5rem;
    label { font-size: 0.9rem; font-weight: 600; color: #333; }
`;

const ToastMessage = styled.div`
    position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem;
    background-color: ${props => (props.type === 'success' ? '#28a745' : '#dc3545')};
    color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 2000; visibility: ${props => (props.show ? 'visible' : 'hidden')};
    animation: ${props => (props.show ? fadeIn : fadeOut)} 0.3s ease;
`;

const tipoLabels = { 1: 'Admin', 2: 'Professor', 3: 'Aluno' };

export default function GerirUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTipo, setFilterTipo] = useState('todos');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type }), 3000);
    };

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const [alunosRes, profsRes] = await Promise.all([
                api.get('/api/usuarios/alunos/matriculados'),
                api.get('/api/usuarios/professores/ativos')
            ]);
            setUsuarios([...alunosRes.data, ...profsRes.data]);
        } catch (err) {
            console.error(err);
            showToast("Falha ao carregar usuários.", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    useEffect(() => {
        let filtered = usuarios;
        if (searchTerm) {
            filtered = filtered.filter(u =>
                u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterTipo !== 'todos') {
            filtered = filtered.filter(u => u.tipo === parseInt(filterTipo));
        }
        setFilteredUsuarios(filtered);
    }, [usuarios, searchTerm, filterTipo]);

    const openEditModal = (usuario) => {
        setUsuarioParaEditar({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            senha: '',
            ativo: usuario.ativo
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setUsuarioParaEditar(null);
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUsuarioParaEditar(p => ({
            ...p,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSalvarEdicao = async () => {
        if (!usuarioParaEditar) return;
        setLoading(true);
        try {
            const dadosAtualizados = {
                nome: usuarioParaEditar.nome,
                email: usuarioParaEditar.email,
                ativo: usuarioParaEditar.ativo
            };
            if (usuarioParaEditar.senha.trim()) {
                dadosAtualizados.senha = usuarioParaEditar.senha;
            }
            await api.put(`/api/usuarios/${usuarioParaEditar.id}`, dadosAtualizados);
            showToast("Usuário atualizado com sucesso!");
            closeEditModal();
            fetchUsuarios();
        } catch (err) {
            console.error(err);
            showToast(err.response?.data || "Erro ao atualizar usuário.", 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <h1>Gerir Usuários</h1>

            <ManagementDiv>
                <h2>Buscar Usuários</h2>
                <SearchBar>
                    <Input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)}>
                        <option value="todos">Todos</option>
                        <option value="3">Alunos</option>
                        <option value="2">Professores</option>
                    </Select>
                </SearchBar>

                {loading && <p>A carregar usuários...</p>}

                {!loading && filteredUsuarios.length === 0 && (
                    <p>Nenhum usuário encontrado.</p>
                )}

                <ListDiv>
                    {filteredUsuarios.map(user => (
                        <Card key={user.id}>
                            <InfoDiv>
                                <h3>{user.nome}</h3>
                                <p className="email">{user.email}</p>
                                <div>
                                    <span className="tipo-badge" tipo={user.tipo}>
                                        {tipoLabels[user.tipo] || 'Desconhecido'}
                                    </span>
                                    <span className="ativo-badge" ativo={user.ativo}>
                                        {user.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            </InfoDiv>
                            <ActionsDiv>
                                <Button onClick={() => openEditModal(user)} disabled={loading}>
                                    Editar
                                </Button>
                            </ActionsDiv>
                        </Card>
                    ))}
                </ListDiv>
            </ManagementDiv>

            {isEditModalOpen && usuarioParaEditar && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>Editar Usuário</h2>
                        <ModalForm>
                            <FormGroup>
                                <label>Nome:</label>
                                <Input
                                    type="text"
                                    name="nome"
                                    value={usuarioParaEditar.nome}
                                    onChange={handleEditChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Email:</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={usuarioParaEditar.email}
                                    onChange={handleEditChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Nova Senha (deixe em branco para manter):</label>
                                <Input
                                    type="password"
                                    name="senha"
                                    value={usuarioParaEditar.senha}
                                    onChange={handleEditChange}
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="ativo"
                                        checked={usuarioParaEditar.ativo}
                                        onChange={handleEditChange}
                                    />{' '}
                                    Usuário Ativo
                                </label>
                            </FormGroup>
                            <ActionsDiv style={{ marginTop: '1rem' }}>
                                <Button secondary onClick={closeEditModal} disabled={loading}>
                                    Cancelar
                                </Button>
                                <Button onClick={handleSalvarEdicao} disabled={loading}>
                                    {loading ? 'A Salvar...' : 'Salvar'}
                                </Button>
                            </ActionsDiv>
                        </ModalForm>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Div>
    );
}
