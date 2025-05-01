import styled from 'styled-components'

export const CreateProductContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

export const CreateProductTitle = styled.h1`
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
  font-size: 0.9rem;
`

export const ProductForm = styled.form`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c3e50;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      outline: none;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`

export const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: #218838;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.65;
  }
`

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`
