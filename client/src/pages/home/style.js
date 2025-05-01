import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  h1 {
    margin-bottom: 1rem;
  }

  p {
    background-color: #f8fafc;
    padding: 1.5rem 2rem;
    border-radius: 16px;
    max-width: 600px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.26);
    font-size: 1.1rem;
  }
`;

export default HomeContainer;
