import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import {
  ReplenishmentContainer,
  ReplenishmentTitle,
  ReplenishmentTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  StatusSelect,
  DeleteButton,
} from './style'

function ReplenishmentList() {
  const [replenishments, setReplenishments] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const token = localStorage.getItem('token') || Cookies.get('token')
    setLoading(true)

    try {
      const [replenishmentsRes, suppliersRes, productsRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/replenishments/', {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get('http://127.0.0.1:8000/api/suppliers/', {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get('http://127.0.0.1:8000/api/products/', {
          headers: { Authorization: `Token ${token}` },
        }),
      ])

      setReplenishments(replenishmentsRes.data)
      setSuppliers(suppliersRes.data)
      setProducts(productsRes.data)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
      toast.error(`Erro ao carregar dados: ${error.message}`)
    }
  }

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find((s) => s.id === supplierId)
    return supplier ? supplier.name : `Fornecedor ID ${supplierId}`
  }

  const getProductNames = (productIds) => {
    return productIds
      .map((id) => {
        const product = products.find((p) => p.id === id)
        return product ? product.name : `Produto ID ${id}`
      })
      .join(', ')
  }

  const handleStatusUpdate = async (id, newStatus) => {
    const token = localStorage.getItem('token') || Cookies.get('token')

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/replenishments/${id}/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      toast.success(`Status atualizado para ${newStatus}`)
      fetchData()
    } catch (error) {
      toast.error(`Erro ao atualizar status: ${error.message}`)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      const token = localStorage.getItem('token') || Cookies.get('token')
      try {
        await axios.delete(`http://127.0.0.1:8000/api/replenishments/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        })
        toast.success('Pedido excluído com sucesso!')
        fetchData()
      } catch (error) {
        toast.error(`Erro ao excluir: ${error.message}`)
      }
    }
  }

  if (loading) return <div>Carregando pedidos de reposição...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <ReplenishmentContainer>
      <ReplenishmentTitle>Pedidos de Reposição</ReplenishmentTitle>

      <ReplenishmentTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Fornecedor</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Produtos</TableHeaderCell>
            <TableHeaderCell>Criado em</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {replenishments.map((replenishment) => (
            <TableRow key={replenishment.id}>
              <TableCell>{replenishment.id}</TableCell>
              <TableCell>{getSupplierName(replenishment.supplier)}</TableCell>
              <TableCell>
                <StatusSelect
                  value={replenishment.status}
                  onChange={(e) =>
                    handleStatusUpdate(replenishment.id, e.target.value)
                  }
                >
                  <option value='pending'>Pendente</option>
                  <option value='sent'>Enviado</option>
                  <option value='received'>Recebido</option>
                  <option value='cancelled'>Cancelado</option>
                </StatusSelect>
              </TableCell>
              <TableCell>{getProductNames(replenishment.products)}</TableCell>
              <TableCell>
                {new Date(replenishment.created_at).toLocaleString()}
              </TableCell>
              <TableCell>
                <DeleteButton onClick={() => handleDelete(replenishment.id)}>
                  Excluir
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </ReplenishmentTable>
    </ReplenishmentContainer>
  )
}

export default ReplenishmentList
