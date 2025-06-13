import styled from 'styled-components'

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`

export const TableContainer = styled.div`
  overflow-x: auto;
`

export const ActionButton = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.danger ? '#ff4444' : '#4285f4')};
  color: white;

  &:hover {
    background-color: ${(props) => (props.danger ? '#cc0000' : '#3367d6')};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

export const Modal = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

export const ModalContent = styled.div`
  background-color: white;
  margin: 4rem auto;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;

  overflow: auto;
  height: 85vh;
`

export const ModalHeader = styled.h3`
  margin-top: 0;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`

export const Container = styled.div`
  width: fit-content;
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

  input,
  textarea {
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

export const RoleSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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
