import styled from 'styled-components'

export const ProductListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

export const ProductListTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding-bottom: 1rem;
`

export const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fadbd8;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  border: 1px solid #f5b7b1;
`

export const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`

export const ProductItem = styled.li`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
    color: #2c3e50;
  }

  input,
  textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`

export const ButtonsContainer = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const PrimaryButton = styled(Button)`
  background-color: #3498db;
  color: white;
`

export const DangerButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
`

export const SecondaryButton = styled(Button)`
  background-color: #95a5a6;
  color: white;
`

export const ProductName = styled.h2`
  color: #2980b9;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`

export const ProductDetail = styled.p`
  color: #34495e;
  margin-bottom: 0.5rem;
  font-size: 1rem;

  strong {
    font-weight: 600;
  }
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: auto;
  }
`
