import '../styles/footer.css';
import instagram from '../assets/imgs/icon_instagram.png';
import facebook from '../assets/imgs/icon_facebook.png';
import apoiase from '../assets/imgs/icon_apoia-se.png';

export default function Footer() {
    return(
        <footer className='footer'>
            <div className='footerLinks'>
                <div className='redesSociais'>
                    <div className='lin'>
                        <img src={instagram} alt="Instagram" className='redesSociaisIcon'/>
                        <a className='redesSociaisLinks' href='https://www.instagram.com/cursinhoinsercaojoinville/'>cursinhoinsercaojoinville</a>
                    </div>
                    <div className='lin'>
                        <img src={facebook} alt="Facebook" className='redesSociaisIcon'/>
                        <a className='redesSociaisLinks' href='https://www.facebook.com/cursinhoinsercaojoinville/'>cursinhoinsercaojoinville</a>
                    </div>
                    <div className='lin'>
                        <img src={apoiase} alt="Apoia-se" className='redesSociaisIcon'/>
                        <a className='redesSociaisLinks' href='https://apoia.se/prevestibularpopularinsercao'>apoia-se</a>
                    </div>
                </div>
                <div className='links'>
                    <a className='link' href=''>Universidades em Joinville e Região</a>
                    <a className='link' href=''>Portal do Aluno</a>
                    <a className='link' href='/admin/register'>Matrícula</a>
                    <a className='link' href='/admin/register'>Cadatro de novo educador popular</a>
                    <a className='link' href=''>Administração</a>
                </div>
            </div>
            <p>© 2025 Cursinho Inserção - Todos os direitos reservados</p>
            <p>Desenvolvedores: <a href=''>Claudio Anselmo</a>, <a href='https://github.com/gabezadx'>Gabriel Henrique Ferreira</a>, <a href='https://github.com/mwrina'>Mari Rosa Oliveira</a>, <a href='https://github.com/messiaspichaujr'>Messias Ferreira Pichau Junior</a>, <a href='https://github.com/nathalia-berri'>Nathalia Aline Berri</a></p>
        </footer>
    )
}