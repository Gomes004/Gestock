import styled from 'styled-components'

export const ReplenishmentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

export const ReplenishmentTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`

export const ReplenishmentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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

export const StatusSelect = styled.select`
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

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`
