import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        api.get('/sections')
            .then(res => setSections(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Navbar />
                <div>
                    <h2>Painel Administrativo</h2>
                    {sections.map(sec => (
                        <div key={sec.id}>
                            <input type="text" defaultValue={sec.titulo}/>
                            <textarea defaultValue={sec.texto}></textarea>
                            <input type="text" defaultValue={sec.imagem_url}/>
                            <button>Salvar</button>
                        </div>
                    ))}
                </div>
            <Footer />
        </>
    );
}