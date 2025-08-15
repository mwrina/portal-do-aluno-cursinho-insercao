import { useState } from "react";
import "../styles/navbar.css";
import logo from '../assets/imgs/logo_sem_fundo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <button id="dropdown" onClick={() => setOpen(!open)}>
        <span className="material-icons">menu</span>
      </button>

      <img src={logo} alt="Logo" className="logo" />

      {open && (
        <div className="dropdown-menu">
          <a href="#home">Home</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </div>
      )}
    </nav>
  );
}