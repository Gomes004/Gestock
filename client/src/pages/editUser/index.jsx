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
} from './style'
import Cookies from 'js-cookie'

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token') || Cookies.get('token')

        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/profile/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        )

        setValue('username', response.data.username)
        setValue('email', response.data.email)
        setValue('description', response.data.description)
        const roleTranslations = {
          admin: 'Administrador',
          manager: 'Gestor',
          stock_operator: 'Operador de Estoque',
        }

        setUserRole(roleTranslations[response.data.role] || response.data.role)

        if (response.data.profile_picture) {
          setCurrentProfilePicture(response.data.profile_picture)
        }
      } catch (error) {
        toast.error('Erro ao carregar perfil. Tente novamente.')
      }
    }

    fetchUserProfile()
  }, [setValue])

  const onSubmit = (data) => {
    setLoading(true)

    const token = localStorage.getItem('token') || Cookies.get('token')

    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('description', data.description)
    if (profilePicture) {
      formData.append('profile_picture', profilePicture)
    }

    axios
      .patch('http://127.0.0.1:8000/api/users/profile/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Perfil atualizado com sucesso!')
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(
            `Erro: ${
              error.response.data.message || 'Erro ao atualizar perfil.'
            }`,
          )
        } else if (error.request) {
          toast.error('Erro de conexão. Verifique sua rede.')
        } else {
          toast.error('Erro ao processar a requisição.')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container>
      <h2>Editar Perfil</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ProfilePicture
          src={
            profilePicture
              ? URL.createObjectURL(profilePicture)
              : currentProfilePicture
          }
          alt='Foto de perfil'
        />
        <FormGroup>
          <label>Cargo:</label> {userRole}
        </FormGroup>
        <FormGroup>
          <label>Nome:</label>
          <input
            type='text'
            placeholder='Nome'
            {...register('username', { required: 'Nome é obrigatório' })}
          />
        </FormGroup>
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}
        <FormGroup>
          <label>E-mail:</label>
          <input
            type='email'
            placeholder='Email'
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0.9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
          />
        </FormGroup>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <FormGroup>
          <label>Descrição:</label>
          <input
            as='textarea'
            placeholder='Descrição'
            {...register('description')}
          />
        </FormGroup>
        <FormGroup>
          <label>Imagem:</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </FormGroup>
        <Button type='submit' disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </Form>
      {loading && <Loading>Carregando...</Loading>}
    </Container>
  )
}

export default EditProfile
