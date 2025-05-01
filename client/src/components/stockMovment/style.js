import styled from 'styled-components'

export const StockMovementContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

export const MainTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding-bottom: 1rem;
`

export const SectionTitle = styled.h2`
  color: #2980b9;
  margin: 2rem 0 1.5rem;
  font-size: 1.8rem;
  display: flex;
  justify-content: space-between;

  button {
    background-color: #28a745;
    color: #fff;
    border-radius: 5px;
    padding: 0 0.5rem;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
      background-color: #218838;
    }
  }
`

export const MovementForm = styled.form`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c3e50;
  }

  select,
  input {
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

  &:hover:not(:disabled) {
    background-color: #218838;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.65;
  }
`

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

export const TableHeader = styled.thead`
  background-color: #343a40;
  color: white;
`

export const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
`

export const MovementTypeIn = styled.span`
  color: #28a745;
  font-weight: 600;
`

export const MovementTypeOut = styled.span`
  color: #dc3545;
  font-weight: 600;
`

export const SectionContainer = styled.div`
  margin-bottom: 3rem;
`
