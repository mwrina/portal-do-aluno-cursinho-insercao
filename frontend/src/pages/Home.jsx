//importação dos hoooks do react

// import { useEffect, useState } from "react";
// import { api } from "../services/api";

//importação dos components

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Section from "../components/Section";
import Footer from "../components/Footer";

import '../global.css';

export default function Home() {

    // essa const cria um estado para guardar os dados das seção que virão da api
    // const [sections, setSections] = useState([]);

    // isso aqui é padrão quando for usar, ele executa a requisição a api apenas uma vez 
    // useEffect(() => {
    //     api.get('/sections')
    //         .then(res => setSections(res.data))
    //         .catch(err => console.error(err));
    // }, []);


    return (
        <>
            <Navbar />
            <Banner />

            {/* ele vai renderizar cada seção recebida pela api
            
            { sections.map (sec => (
                <Section
                    key={sec.id}
                    titulo={sec.titulo}
                    texto={sec.texto}
                    imagem={sec.imagem_url}
                />
            ))} */}

            <Section/>
            <Footer/>
        </>
    )
}