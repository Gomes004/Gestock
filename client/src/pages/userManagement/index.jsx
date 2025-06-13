import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Container,
  Form,
  Button,
  ErrorMessage,
  Loading,
  ProfilePicture,
  FormGroup,
  UserTable,
  TableContainer,
  ActionButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  RoleSelect,
} from './style'
import Cookies from 'js-cookie'
import { MdClose } from 'react-icons/md'

const UserManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null)
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false)

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token') || Cookies.get('token')
      const response = await axios.get(
        'http://127.0.0.1:8000/api/users-list/',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      setUsers(response.data)
    } catch (error) {
      toast.error('Erro ao carregar lista de usuários. Tente novamente.')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const openEditModal = (user) => {
    setSelectedUser(user)
    setValue('username', user.username)
    setValue('email', user.email)
    setValue('description', user.description)
    setValue('role', user.role)
    setCurrentProfilePicture(user.profile_picture)
    setIsEditModalOpen(true)
    setIsCreatingNewUser(false)
  }

  const openCreateModal = () => {
    reset()
    setSelectedUser(null)
    setProfilePicture(null)
    setCurrentProfilePicture(null)
    setIsEditModalOpen(true)
    setIsCreatingNewUser(true)
  }

  const onSubmit = async (data) => {
    setLoading(true)
    const token = localStorage.getItem('token') || Cookies.get('token')

    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('description', data.description || '')
    formData.append('role', data.role)

    if (isCreatingNewUser && data.password) {
      formData.append('password', data.password)
    }

    if (profilePicture instanceof File) {
      formData.append('profile_picture', profilePicture)
    }

    try {
      if (isCreatingNewUser) {
        await axios.post('http://127.0.0.1:8000/api/users/', formData, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
      } else {
        await axios.patch(
          `http://127.0.0.1:8000/api/users/${selectedUser.id}/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        )
      }

      toast.success(
        isCreatingNewUser
          ? 'Usuário criado com sucesso!'
          : 'Usuário atualizado com sucesso!',
      )
      fetchUsers()
      setIsEditModalOpen(false)

      if (isCreatingNewUser) {
        setProfilePicture(null)
        setCurrentProfilePicture(null)
        reset()
      }
    } catch (error) {
      console.error('Erro na requisição:', error)

      if (error.response) {
        toast.error(
          `Erro: ${
            error.response.data.message ||
            (isCreatingNewUser
              ? 'Erro ao criar usuário.'
              : 'Erro ao atualizar usuário.')
          }`,
        )

        if (error.response.data) {
          console.log('Detalhes do erro:', error.response.data)
        }
      } else if (error.request) {
        toast.error('Erro de conexão. Verifique sua rede.')
      } else {
        toast.error('Erro ao processar a requisição.')
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = (userId) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      const token = localStorage.getItem('token') || Cookies.get('token')
      axios
        .delete(`http://127.0.0.1:8000/api/users/${userId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          toast.success('Usuário deletado com sucesso!')
          fetchUsers()
        })
        .catch((error) => {
          toast.error('Erro ao deletar usuário. Tente novamente.')
        })
    }
  }

  const translateRole = (role) => {
    const roleTranslations = {
      admin: 'Administrador',
      manager: 'Gestor',
      stock_operator: 'Operador de Estoque',
    }
    return roleTranslations[role] || role
  }

  return (
    <Container>
      <h2>Gerenciamento de Usuários</h2>

      <Button onClick={openCreateModal} style={{ marginBottom: '20px' }}>
        Criar Novo Usuário
      </Button>

      <TableContainer>
        <UserTable>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <ProfilePicture
                    src={user.profile_picture}
                    alt={`Foto de ${user.username}`}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{translateRole(user.role)}</td>
                <td>
                  <ActionButton onClick={() => openEditModal(user)}>
                    Editar
                  </ActionButton>
                  <ActionButton danger onClick={() => deleteUser(user.id)}>
                    Excluir
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </UserTable>
      </TableContainer>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            {isCreatingNewUser ? 'Criar Novo Usuário' : 'Editar Usuário'}{' '}
            <Button type='button' onClick={() => setIsEditModalOpen(false)}>
              <MdClose />
            </Button>
          </ModalHeader>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {!isCreatingNewUser && (
              <ProfilePicture
                src={
                  profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : currentProfilePicture
                }
                alt='Foto de perfil'
              />
            )}

            <FormGroup>
              <label>Nome:</label>
              <input
                type='text'
                placeholder='Nome'
                {...register('username', { required: 'Nome é obrigatório' })}
              />
              {errors.username && (
                <ErrorMessage>{errors.username.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <label>E-mail:</label>
              <input
                type='email'
                placeholder='Email'
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </FormGroup>

            {isCreatingNewUser && (
              <FormGroup>
                <label>Senha:</label>
                <input
                  type='password'
                  placeholder='Senha'
                  {...register('password')}
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </FormGroup>
            )}

            <FormGroup>
              <label>Descrição:</label>
              <textarea placeholder='Descrição' {...register('description')} />
            </FormGroup>

            <FormGroup>
              <label>Cargo:</label>
              <RoleSelect
                {...register('role', { required: 'Cargo é obrigatório' })}
              >
                <option value=''>Selecione um cargo</option>
                <option value='admin'>Administrador</option>
                <option value='manager'>Gestor</option>
                <option value='stock_operator'>Operador de Estoque</option>
              </RoleSelect>

              {errors.role && (
                <ErrorMessage>{errors.role.message}</ErrorMessage>
              )}
            </FormGroup>

            {!isCreatingNewUser && (
              <FormGroup>
                <label>Imagem:</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </FormGroup>
            )}

            <ModalFooter>
              <Button type='button' onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button type='submit' disabled={loading}>
                {loading
                  ? isCreatingNewUser
                    ? 'Criando...'
                    : 'Salvando...'
                  : isCreatingNewUser
                  ? 'Criar Usuário'
                  : 'Salvar Alterações'}
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>

      {loading && <Loading>Carregando...</Loading>}
    </Container>
  )
}

export default UserManagement
