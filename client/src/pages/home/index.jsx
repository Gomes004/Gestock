import { toast } from "react-toastify";
import HomeContainer from "./style";

const Home = () => {
  return (
    <HomeContainer>
      <h1>Gestock</h1>
      <p>
        Bem-vindo ao <strong>Gestock</strong>! Sua plataforma de gerenciamento de estoque
        fácil, rápida e eficiente. Acompanhe entradas e saídas, organize seu inventário
        e tenha controle total do seu negócio.
      </p>
    </HomeContainer>
  );
};

export default Home;
