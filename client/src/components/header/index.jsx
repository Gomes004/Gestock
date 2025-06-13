import { NavLink, Navigate } from 'react-router-dom'
import { Navbar, NavList, NavItem, NavButton } from './style'
import { MdHome } from 'react-icons/md'
import { IoMdInformationCircle } from 'react-icons/io'
import { RiDashboardFill } from 'react-icons/ri'
import { TbLogout, TbLogin } from 'react-icons/tb'

const Header = ({ isAuthenticated, handleLogout }) => {
  return (
    <Navbar>
      <NavList>
        <NavItem>
          <NavLink to='/' end>
            <MdHome />
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/about'>
            <IoMdInformationCircle />
            Sobre
          </NavLink>
        </NavItem>
      </NavList>

      <NavList>
        {isAuthenticated ? (
          <>
            <NavItem>
              <NavLink to='/dashboard'>
                <RiDashboardFill />
                Painel
              </NavLink>
            </NavItem>

            <NavButton
              onClick={() => {
                handleLogout()
                Navigate('/login')
              }}
            >
              <TbLogout />
              Sair
            </NavButton>
          </>
        ) : (
          <NavItem>
            <NavLink to='/login'>
              <TbLogin />
              Entrar
            </NavLink>
          </NavItem>
        )}
      </NavList>
    </Navbar>
  )
}

export default Header
