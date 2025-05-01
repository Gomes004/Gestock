import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import {
  CreateReplenishmentContainer,
  CreateReplenishmentTitle,
  ErrorMessage,
  ReplenishmentForm,
  FormGroup,
  CheckboxGroup,
  CheckboxItem,
  SubmitButton,
} from './style'

function CreateReplenishment() {
  const [formData, setFormData] = useState({
    supplier: '',
    status: 'pending',
    products: [],
  })
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token') || Cookies.get('token')

    axios
      .get('http://127.0.0.1:8000/api/suppliers/', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setSuppliers(res.data))
      .catch((error) =>
        toast.error(`Erro ao carregar fornecedores: ${error.message}`),
      )

    axios
      .get('http://127.0.0.1:8000/api/products/', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((error) =>
        toast.error(`Erro ao carregar produtos: ${error.message}`),
      )
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleProductToggle = (productId) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter((id) => id !== productId)
        : [...prev.products, productId],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token') || Cookies.get('token')
    setLoading(true)

    axios
      .post('http://127.0.0.1:8000/api/replenishments/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toast.success('Pedido de reposição criado com sucesso!')
        setFormData({
          supplier: '',
          status: 'pending',
          products: [],
        })
      })
      .catch((error) => {
        toast.error(`Erro ao criar pedido: ${error.message}`)
        setError(error.response?.data || error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <CreateReplenishmentContainer>
      <CreateReplenishmentTitle>
        Criar Pedido de Reposição
      </CreateReplenishmentTitle>

      {error && <ErrorMessage>Erro: {JSON.stringify(error)}</ErrorMessage>}

      <ReplenishmentForm onSubmit={handleSubmit}>
        <FormGroup>
          <label>Fornecedor:</label>
          <select
            name='supplier'
            value={formData.supplier}
            onChange={handleChange}
            required
          >
            <option value=''>Selecione um fornecedor</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </FormGroup>

        <FormGroup>
          <label>Status:</label>
          <select
            name='status'
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value='pending'>Pendente</option>
            <option value='sent'>Enviado</option>
            <option value='received'>Recebido</option>
            <option value='cancelled'>Cancelado</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Produtos:</label>
          <CheckboxGroup>
            {products.map((product) => (
              <CheckboxItem key={product.id}>
                <label>
                  <input
                    type='checkbox'
                    checked={formData.products.includes(product.id)}
                    onChange={() => handleProductToggle(product.id)}
                  />
                  {product.name}
                </label>
              </CheckboxItem>
            ))}
          </CheckboxGroup>
        </FormGroup>

        <SubmitButton type='submit' disabled={loading}>
          {loading ? 'Enviando...' : 'Criar Pedido'}
        </SubmitButton>
      </ReplenishmentForm>
    </CreateReplenishmentContainer>
  )
}

export default CreateReplenishment
