import { NavLink } from 'react-router-dom'
import { Container, Item, ItemContainer, Title } from './style'
import { ImProfile } from 'react-icons/im'
import {
  FaBoxesStacked,
  FaHandshakeSimple,
  FaTruckRampBox,
} from 'react-icons/fa6'
import { RiUserSettingsLine } from 'react-icons/ri'

const Dashboard = ({ userRole }) => {
  return (
    <Container>
      <Title>Painel</Title>

      <ItemContainer>
        <Item>
          <NavLink to='/edit-profile'>
            Editar Perfil <ImProfile size={'3rem'} />
          </NavLink>
        </Item>
        <Item>
          <NavLink to='/products'>
            Produtos <FaBoxesStacked size={'3rem'} />
          </NavLink>
        </Item>

        {userRole === 'admin' && (
          <>
            <Item>
              <NavLink to='/suppliers'>
                Fornecedores <FaHandshakeSimple size={'3rem'} />
              </NavLink>
            </Item>
            <Item>
              <NavLink to='/replenishments'>
                Reposição <FaTruckRampBox size={'3rem'} />
              </NavLink>
            </Item>
            <Item>
              <NavLink to='/users-management'>
                Gerenciar Usuários <RiUserSettingsLine size={'3rem'} />
              </NavLink>
            </Item>
          </>
        )}
      </ItemContainer>
    </Container>
  )
}

export default Dashboard
