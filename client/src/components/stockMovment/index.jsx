import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import {
  StockMovementContainer,
  MainTitle,
  SectionTitle,
  SectionContainer,
  MovementForm,
  FormGroup,
  SubmitButton,
  HistoryTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  MovementTypeIn,
  MovementTypeOut,
} from './style'
import { toast } from 'react-toastify'

function StockMovementComponent() {
  const [movements, setMovements] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    product: '',
    movement_type: 'in',
    quantity: 0,
    reason: '',
  })

  const token = localStorage.getItem('token') || Cookies.get('token')
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)

    axios
      .get('http://127.0.0.1:8000/api/stock-movements/', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setMovements(res.data)
        return axios.get('http://127.0.0.1:8000/api/products/', {
          headers: { Authorization: `Token ${token}` },
        })
      })
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token') || Cookies.get('token')
    setLoading(true)

    axios
      .post('http://127.0.0.1:8000/api/stock-movements/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toast.success('Movimentação cadastrada com sucesso!')
        setFormData({
          product: '',
          movement_type: 'in',
          quantity: 0,
          reason: '',
        })
        fetchData()
      })
      .catch((error) => {
        setError(error.response?.data || error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Date(dateString).toLocaleDateString('pt-BR', options)
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro: {error}</div>
  }

  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/stock-report/pdf/',
        {
          headers: {
            Authorization: `Token ${token}`,
            Accept: '*/*',
          },
          responseType: 'blob',
        },
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'relatorio_estoque.pdf')
      document.body.appendChild(link)
      link.click()

      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro detalhado:', error.response)
      toast.error(error.response?.data?.detail || 'Erro ao baixar o relatório')
    }
  }
  return (
    <StockMovementContainer>
      <MainTitle>Movimentação de Estoque</MainTitle>

      <SectionContainer>
        <SectionTitle>Registrar Movimentação</SectionTitle>
        <MovementForm onSubmit={handleSubmit}>
          <FormGroup>
            <label>Produto:</label>
            <select
              name='product'
              value={formData.product}
              onChange={handleChange}
              required
            >
              <option value=''>Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (Estoque: {product.current_stock})
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>Tipo de Movimentação:</label>
            <select
              name='movement_type'
              value={formData.movement_type}
              onChange={handleChange}
              required
            >
              <option value='in'>Entrada</option>
              <option value='out'>Saída</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Quantidade:</label>
            <input
              type='number'
              name='quantity'
              value={formData.quantity}
              onChange={handleChange}
              min='1'
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Motivo:</label>
            <input
              type='text'
              name='reason'
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type='submit' disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar Movimentação'}
          </SubmitButton>
        </MovementForm>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>
          Histórico de Movimentações{' '}
          <button onClick={downloadPDF}>Baixar Relatório</button>
        </SectionTitle>

        <HistoryTable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Data</TableHeaderCell>
              <TableHeaderCell>Produto</TableHeaderCell>
              <TableHeaderCell>Tipo</TableHeaderCell>
              <TableHeaderCell>Quantidade</TableHeaderCell>
              <TableHeaderCell>Motivo</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {movements.map((movement) => {
              const product = products.find((p) => p.id === movement.product)
              return (
                <TableRow key={movement.id}>
                  <TableCell>{formatDate(movement.created_at)}</TableCell>
                  <TableCell>
                    {product ? product.name : 'Produto não encontrado'}
                  </TableCell>
                  <TableCell>
                    {movement.movement_type === 'in' ? (
                      <MovementTypeIn>Entrada</MovementTypeIn>
                    ) : (
                      <MovementTypeOut>Saída</MovementTypeOut>
                    )}
                  </TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.reason}</TableCell>
                </TableRow>
              )
            })}
          </tbody>
        </HistoryTable>
      </SectionContainer>
    </StockMovementContainer>
  )
}

export default StockMovementComponent
