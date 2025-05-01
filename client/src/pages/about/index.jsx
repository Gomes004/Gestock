import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

const AboutBox = styled.div`
  background-color: #f8fafc;
  padding: 2rem;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.31);
  text-align: center;

  h1 {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
  }
`;

const About = () => {
  return (
    <Container>
      <AboutBox>
        <h1>Sobre Nós</h1>
        <p>
          O <strong>Gestock</strong> nasceu da necessidade de facilitar o controle de estoque de pequenas e médias empresas.
          Nosso objetivo é proporcionar uma plataforma intuitiva, eficiente e acessível, permitindo que empreendedores
          tenham total domínio sobre a entrada e saída de seus produtos. Acreditamos que a tecnologia deve ser uma aliada no dia a dia dos negócios,
          simplificando processos e promovendo o crescimento sustentável.
          <br /><br />
          Com o Gestock, você tem tudo o que precisa para organizar seu estoque em um só lugar com segurança, rapidez e clareza.
        </p>
      </AboutBox>
    </Container>
  );
};

export default About;
