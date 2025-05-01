import styled from 'styled-components'

export const Navbar = styled.nav`
  background-color: #222;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 5px solid #111;

  margin-bottom: 3rem;
`

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;

  span {
    width: 2px;
    height: 2rem;
    background-color: #fff;
    border: none;
  }
`

export const NavItem = styled.li`
  margin: 0 1rem;

  a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    border: 1px solid #444;

    &:hover {
      color: #61dafb;
      background-color: #444;
    }

    &.active {
      color: #61dafb;
      background-color: #555;
      font-weight: bold;
    }
  }
`

export const NavButton = styled.button`
  margin: 0 1rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c9302c;
  }
`
