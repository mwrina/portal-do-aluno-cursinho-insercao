import { useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminLogin() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleLogin(e) {
        
        e.preventDefault();

        try {
            const res = await api.post('/login', { email, senha });
            localStorage.setItem('token', res.data.token);
            window.location.href = '/admin/dashboard';
        } catch {
            alert('Login inválido');
        }
    }

    return (
        <>
            <Navbar />

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>

            <Footer />
        </>
    );
}