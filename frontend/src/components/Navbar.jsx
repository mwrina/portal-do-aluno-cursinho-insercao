import { useState } from "react";
import styled from 'styled-components';
import logo from '../assets/imgs/logo_sem_fundo.png';

const NavbarDiv = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 0 1rem;
    background-image: url("../assets/imgs/logo.jpg"); 
    background-position: 100% 70px;    
    position: relative;
`

const Logo = styled.img`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 70px;
`

const MenuBtn = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
`


export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <NavbarDiv>
            <MenuBtn id="dropdown" onClick={() => setOpen(!open)}>
              <span className="material-icons">menu</span>
            </MenuBtn>

            <Logo src={logo} alt="Logo" className="logo" />

              {open && (
                  <div className="dropdown-menu">
                      <a href="/">Página Inicial</a>
                      <a href="#home">Portal do Aluno</a>
                      <a href="/admin/register">Matrícula</a>
                      <a href="/admin/register">Cadastro de Educador Popular</a>
                  </div>
              )}
        </NavbarDiv>
    );
}