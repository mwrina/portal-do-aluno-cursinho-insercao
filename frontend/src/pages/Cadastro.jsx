//importação dos componentes
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CadastroForm from "../components/CadastroForm";

import '../global.css';

export default function Cadastro() {

    return(
        <>
            <Navbar/>
            <CadastroForm/>
            <Footer/>
        </>
    )
    
}

