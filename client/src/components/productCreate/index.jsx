import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'
import {
  CreateProductContainer,
  CreateProductTitle,
  ErrorMessage,
  ProductForm,
  FormGroup,
  InputGroup,
  SubmitButton,
} from './style'

function CreateProductComponent() {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    current_stock: 0,
    minimum_stock: 0,
    is_active: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const token = localStorage.getItem('token') || Cookies.get('token')

    axios
      .post('http://127.0.0.1:8000/api/products/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toast.success('Produto cadastrado com sucesso!')
        setFormData({
          code: '',
          name: '',
          description: '',
          category: '',
          price: 0,
          current_stock: 0,
          minimum_stock: 0,
          is_active: true,
        })
      })
      .catch((error) => {
        setError(error.response?.data || error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <CreateProductContainer>
      <CreateProductTitle>Criar Novo Produto</CreateProductTitle>

      {error && <ErrorMessage>Erro: {JSON.stringify(error)}</ErrorMessage>}

      <ProductForm onSubmit={handleSubmit}>
        <FormGroup>
          <label>Código:</label>
          <input
            type='text'
            name='code'
            value={formData.code}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Nome:</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Descrição:</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Categoria:</label>
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <InputGroup>
          <FormGroup>
            <label>Preço:</label>
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              step='0.01'
              min='0'
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Estoque Atual:</label>
            <input
              type='number'
              name='current_stock'
              value={formData.current_stock}
              onChange={handleChange}
              min='0'
              required
            />
          </FormGroup>
        </InputGroup>

        <FormGroup>
          <label>Estoque Mínimo:</label>
          <input
            type='number'
            name='minimum_stock'
            value={formData.minimum_stock}
            onChange={handleChange}
            min='0'
            required
          />
        </FormGroup>

        <SubmitButton type='submit' disabled={loading}>
          {loading ? 'Enviando...' : 'Criar Produto'}
        </SubmitButton>
      </ProductForm>
    </CreateProductContainer>
  )
}

export default CreateProductComponent
