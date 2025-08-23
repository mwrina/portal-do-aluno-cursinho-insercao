import styled from 'styled-components';
import banner from "../assets/imgs/img_capa_exemplo.jpg";

const Imagem = styled.div`
  width: 100%;
  height: 500px;
  filter: brightness(50%);
  background-image: url(${banner});
  background-position: center;
  background-size: cover;
`;

export default function Banner(){
    return(
        <Imagem/>
    )
}