import styled from 'styled-components';
import instagram from '../assets/imgs/icon_instagram.png';
import facebook from '../assets/imgs/icon_facebook.png';
import apoiase from '../assets/imgs/icon_apoia-se.png';

const FooterDiv = styled.footer`
    background-color: #F2B924;
    text-align: center;
    font-size: 14px;
    line-height: 50px;
    font-weight: 400;
    bottom: 0;
    width: 100%;
    padding: 50px 40px 50px 40px;
    color: #FFFFFF;
`

const Link = styled.a`
    text-decoration: inherit;
    font-style: italic;
    color: inherit;
`

const FooterLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
`

const RedesSociais = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 50%;
`

const Lin = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0 10px 0;
`

const RedesSociaisIcon = styled.img`
    height: 30px;
    margin: 0 15px 0 0;
`

const Links = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    color: #E23467;
    text-decoration: underline;
`

export default function Footer() {
    return(
        <FooterDiv>
            <FooterLinks>
                <RedesSociais>
                    <Lin>
                        <RedesSociaisIcon src={instagram} alt="Instagram" className='redesSociaisIcon'/>
                        <Link className='redesSociaisLinks' href='https://www.instagram.com/cursinhoinsercaojoinville/'>cursinhoinsercaojoinville</Link>
                    </Lin>
                    <Lin>
                        <RedesSociaisIcon src={facebook} alt="Facebook" className='redesSociaisIcon'/>
                        <Link className='redesSociaisLinks' href='https://www.facebook.com/cursinhoinsercaojoinville/'>cursinhoinsercaojoinville</Link>
                    </Lin>
                    <Lin>
                        <RedesSociaisIcon src={apoiase} alt="Apoia-se" className='redesSociaisIcon'/>
                        <Link className='redesSociaisLinks' href='https://apoia.se/prevestibularpopularinsercao'>apoia-se</Link>
                    </Lin>
                </RedesSociais>
                <Links>
                    <Link href=''>Universidades em Joinville e Região</Link>
                    <Link href=''>Portal do Aluno</Link>
                    <Link href='/admin/register'>Matrícula</Link>
                    <Link href='/admin/register'>Cadatro de novo educador popular</Link>
                    <Link href=''>Administração</Link>
                </Links>
            </FooterLinks>
            <p>© 2025 Cursinho Inserção - Todos os direitos reservados</p>
            <p>Desenvolvedores: <a href='https://github.com/Anselmo2001'>Claudio Anselmo</a>, <a href='https://github.com/gabezadx'>Gabriel Henrique Ferreira</a>, <a href='https://github.com/mwrina'>Mari Rosa Oliveira</a>, <a href='https://github.com/messiaspichaujr'>Messias Ferreira Pichau Junior</a>, <a href='https://github.com/nathalia-berri'>Nathalia Aline Berri</a></p>
        </FooterDiv>
    )
}