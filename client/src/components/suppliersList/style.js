import styled from 'styled-components'

export const SuppliersContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`

export const SuppliersTitle = styled.h1`
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

export const SuppliersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 1.5rem;
`

export const TableHeader = styled.thead`
  background-color: #343a40;
  color: white;
`

export const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  vertical-align: top;
`

export const EditForm = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.9rem;
  }

  input {
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

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 4px;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: normal;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`

export const EditButton = styled(Button)`
  background-color: #3498db;
  color: #fff;
  margin-right: 0.5rem;

  &:hover {
    background-color: #66a8e1;
  }
`

export const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`

export const SaveButton = styled(Button)`
  background-color: #28a745;
  color: white;
  margin-right: 0.5rem;

  &:hover {
    background-color: #218838;
  }
`

export const CancelButton = styled(Button)`
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: #5a6268;
  }
`

export const ActiveStatus = styled.span`
  color: #28a745;
  font-weight: 600;
`

export const InactiveStatus = styled.span`
  color: #dc3545;
  font-weight: 600;
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`
