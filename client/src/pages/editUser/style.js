import styled from 'styled-components'

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 1rem;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c3e50;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
`

export const Button = styled.button`
  padding: 10px;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #4fa3c7;
  }
`

export const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`

export const Loading = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 10px;
`

export const ProfilePicture = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 10%;
  margin-bottom: 15px;
  object-fit: cover;
  background-color: gray;
`
