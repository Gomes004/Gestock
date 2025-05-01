import styled from 'styled-components'

export const TabsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

export const TabsHeader = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;

  padding-bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const TabButton = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1rem;
  color: #555;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 4px 4px 0 0;

  border-bottom: 3px solid #f0f0f0;

  &:hover {
    color: #2c3e50;
    background-color: #f0f0f0;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    color: #3498db;
    font-weight: 600;
    background-color: #f0f0f0;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #3498db;
    }
  `}
`

export const TabContent = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
