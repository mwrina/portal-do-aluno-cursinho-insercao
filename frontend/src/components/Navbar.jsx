import '../styles/navbar.css';

export default function Navbar() {

    return (
        <nav className="navbar">
            <h1>Homepage - Blog</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#contato">Contato</a></li>
                <li><a href="/admin">Admin</a></li>
            </ul>
        </nav>
    )
}

