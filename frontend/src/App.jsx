import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Páginas ---
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import AdminLogin from './pages/AdminLogin';

// --- Páginas de Administração ---
import GerirBanners from './pages/admin/GerirBanners';
import GerirSecoes from './pages/admin/GerirSecoes';
import GerirRedes from './pages/admin/GerirRedes';
import GerirRelatorioUnis from './pages/admin/GerirRelatorioUnis';
import GerirUsuarios from './pages/admin/GerirUsuarios';
import NovasCandidaturas from './pages/admin/NovasCandidaturas';
import EducadoresCadastrados from './pages/admin/EducadoresCadastrados';
import AlunosMatriculados from './pages/admin/AlunosMatriculados';
import NovasMatriculas from './pages/admin/NovasMatriculas';

// --- Páginas do Portal do Aluno ---
import DetalhesAvaliacao from './pages/portal-do-aluno/DetalhesAvaliacao';
import GerirAvaliacoes from './pages/portal-do-aluno/GerirAvaliacoes';
import NotasAluno from './pages/portal-do-aluno/NotasAluno';
import Recados from './pages/portal-do-aluno/Recados';
import Conteudos from './pages/portal-do-aluno/Conteudos';

// --- Layouts e Componentes de Segurança ---
import AdminLayout from './layouts/AdminLayout';
import PortalLayout from './layouts/PortalLayout';
import ProtectedRoute from './components/ProtectedRoute';
import VerFrequencia from './pages/portal-do-aluno/VerFrequencia';
import LancarFrequencia from './pages/portal-do-aluno/LancarFrequencia';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ========== ROTAS PÚBLICAS ========== */}
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/admin" element={<Navigate to="/admin/login" replace/>}/>
                <Route path="/admin/login" element={<AdminLogin/>}/>
                <Route path="/portal/login" element={<AdminLogin/>}/>

                {/* ========== ROTAS PROTEGIDAS DO PAINEL DE ADMINISTRAÇÃO ========== */}
                <Route element={<ProtectedRoute allowedRoles={[1]}/>}>
                    <Route element={<AdminLayout/>}>
                        <Route path="/admin/dashboard" element={<Navigate to="/admin/secoes" replace/>}/>
                        <Route path="/admin/secoes" element={<GerirSecoes/>}/>
                        <Route path="/admin/banners" element={<GerirBanners/>}/>
                        <Route path="/admin/redes" element={<GerirRedes/>}/>
                        <Route path="/admin/relatorio-universidades" element={<GerirRelatorioUnis/>}/>
                        <Route path="/admin/educadores/candidaturas" element={<NovasCandidaturas/>}/>
                        <Route path="/admin/educadores/cadastrados" element={<EducadoresCadastrados/>}/>
                        <Route path="/admin/alunos/matriculados" element={<AlunosMatriculados/>}/>
                        <Route path="/admin/alunos/matriculas" element={<NovasMatriculas/>}/>
                        <Route path="/admin/usuarios" element={<GerirUsuarios/>}/>
                        <Route path="/admin/criar-conta" element={<Cadastro/>}/>
                    </Route>
                </Route>

                {/* ========== ROTAS PROTEGIDAS DO PORTAL (PROFESSOR + ALUNO) ========== */}
                <Route element={<ProtectedRoute allowedRoles={[2, 3]}/>}>
                    <Route element={<PortalLayout/>}>
                        <Route path="/portal/avaliacoes" element={<GerirAvaliacoes/>}/>
                        <Route path="/portal/avaliacoes/edit" element={<DetalhesAvaliacao/>}/>
                        <Route path="/portal/avaliacoes/ver" element={<DetalhesAvaliacao/>}/>
                        <Route path="/portal/frequencia/ver" element={<VerFrequencia/>}/>
                        <Route path="/portal/frequencia" element={<LancarFrequencia/>}/>
                        <Route path="/portal/notas" element={<NotasAluno/>}/>
                        <Route path="/portal/recados" element={<Recados/>}/>
                        <Route path="/portal/conteudos" element={<Conteudos/>}/>
                    </Route>
                </Route>

                {/* ========== 404 ========== */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

