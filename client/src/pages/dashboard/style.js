import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 40rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h1`
  font-size: 2rem;
  color: #343a40;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
`

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  width: 30rem;
  align-self: center;
`

export const Item = styled.div`
  transition: all 0.3s ease;
  width: fit-content;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #495057;
    font-weight: 500;
    font-size: 1.1rem;
    transition: color 0.2s;
    height: 10rem;
    width: 10rem;

    background-color: white;
    padding: 1rem 2rem;
    border-radius: 8px;

    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
      color: #1971c2;
    }

    &.active {
      color: #1864ab;
      font-weight: 600;
    }
  }
`
