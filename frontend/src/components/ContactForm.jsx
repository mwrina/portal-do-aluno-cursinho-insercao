import '../styles/contact.css';

export default function ContactForm(){
    return(
        <section id='contato'> 
            <h3>Entre em contato</h3>
            <form>
                <input type="text" placeholder='Seu Nome'/>
                <input type='email' placeholder='Seu email'/>
                <textarea placeholder='Sua mensagem'></textarea>
                <button type='submit'>Enviar</button>
            </form>
        </section>
    );
}