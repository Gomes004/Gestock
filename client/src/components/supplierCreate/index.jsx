import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import {
  SupplierContainer,
  SupplierTitle,
  ErrorMessage,
  SupplierForm,
  FormGroup,
  CheckboxGroup,
  SubmitButton,
} from './style'

function CreateSupplier() {
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    products: [],
    is_active: true,
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token') || Cookies.get('token')
    axios
      .get('http://127.0.0.1:8000/api/products/', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((error) => setError(error.message))
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleProductChange = (productId, isChecked) => {
    setFormData((prev) => ({
      ...prev,
      products: isChecked
        ? [...prev.products, productId]
        : prev.products.filter((id) => id !== productId),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token') || Cookies.get('token')
    setLoading(true)
    setError(null)

    axios
      .post('http://127.0.0.1:8000/api/suppliers/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toast.success('Fornecedor cadastrado com sucesso!')
        setFormData({
          name: '',
          contact_person: '',
          email: '',
          phone: '',
          address: '',
          products: [],
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
    <SupplierContainer>
      <SupplierTitle>Cadastrar Novo Fornecedor</SupplierTitle>

      {error && <ErrorMessage>Erro: {JSON.stringify(error)}</ErrorMessage>}

      <SupplierForm onSubmit={handleSubmit}>
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
          <label>Pessoa de Contato:</label>
          <input
            type='text'
            name='contact_person'
            value={formData.contact_person}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Telefone:</label>
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Endereço:</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Produtos Fornecidos:</label>
          <CheckboxGroup>
            {products.map((product) => (
              <label key={product.id}>
                <input
                  type='checkbox'
                  checked={formData.products.includes(product.id)}
                  onChange={(e) =>
                    handleProductChange(product.id, e.target.checked)
                  }
                />
                {product.name}
              </label>
            ))}
          </CheckboxGroup>
        </FormGroup>

        <SubmitButton type='submit' disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar Fornecedor'}
        </SubmitButton>
      </SupplierForm>
    </SupplierContainer>
  )
}

export default CreateSupplier
