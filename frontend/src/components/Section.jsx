import '../styles/section.css';

export default function Section({ titulo, texto, imagem}) {

    return(
        <div className='section'>
            <div className='text'>
                <h3>{titulo}</h3>
                <p>{texto}</p>
            </div>
            <img src={imagem} alt="{titulo}"/>
        </div>
    );
}