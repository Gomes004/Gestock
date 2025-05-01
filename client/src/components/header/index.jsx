import { NavLink, Navigate } from 'react-router-dom'
import { Navbar, NavList, NavItem, NavButton } from './style'

const Header = ({ isAuthenticated, userRole, handleLogout }) => {
  return (
    <Navbar>
      <NavList>
        <NavItem>
          <NavLink to='/' end>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/about'>Sobre</NavLink>
        </NavItem>
      </NavList>

      <NavList>
        {isAuthenticated ? (
          <>
            <NavItem>
              <NavLink to='/dashboard'>Painel</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/edit-profile'>Editar Perfil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/products'>Produtos</NavLink>
            </NavItem>

            {userRole === 'admin' && (
              <>
                <NavItem>
                  <NavLink to='/suppliers'>Fornecedores</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/replenishments'>Reposição</NavLink>
                </NavItem>
              </>
            )}

            <NavButton
              onClick={() => {
                handleLogout()
                Navigate('/login')
              }}
            >
              Sair
            </NavButton>
          </>
        ) : (
          <NavItem>
            <NavLink to='/login'>Entrar</NavLink>
          </NavItem>
        )}
      </NavList>
    </Navbar>
  )
}

export default Header
