import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import {
  SuppliersContainer,
  SuppliersTitle,
  ErrorMessage,
  SuppliersTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  EditForm,
  FormGroup,
  CheckboxGroup,
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  ActiveStatus,
  InactiveStatus,
  ActionsContainer,
} from './style'
import { MdFileDownloadDone, MdOutlineCancel } from 'react-icons/md'

function SupplierList() {
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    products: [],
    is_active: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    const token = localStorage.getItem('token') || Cookies.get('token')
    setLoading(true)

    axios
      .get('http://127.0.0.1:8000/api/suppliers/', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setSuppliers(res.data)
        return axios.get('http://127.0.0.1:8000/api/products/', {
          headers: { Authorization: `Token ${token}` },
        })
      })
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
        setError(null)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }

  const handleDelete = (id) => {
    const token = localStorage.getItem('token') || Cookies.get('token')
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      axios
        .delete(`http://127.0.0.1:8000/api/suppliers/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then(() => {
          fetchData()
        })
        .catch((error) => {
          setError(error.message)
        })
    }
  }

  const handleEdit = (supplier) => {
    setEditingId(supplier.id)
    setEditForm({
      name: supplier.name,
      contact_person: supplier.contact_person,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      products: supplier.products || [],
      is_active: supplier.is_active,
    })
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'product') {
      const productId = parseInt(value)
      setEditForm((prev) => ({
        ...prev,
        products: checked
          ? [...prev.products, productId]
          : prev.products.filter((id) => id !== productId),
      }))
    } else {
      setEditForm({
        ...editForm,
        [name]: type === 'checkbox' ? checked : value,
      })
    }
  }

  const handleProductSelect = (e) => {
    const options = e.target.options
    const selectedProducts = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedProducts.push(parseInt(options[i].value))
      }
    }
    setEditForm({
      ...editForm,
      products: selectedProducts,
    })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token') || Cookies.get('token')
    setLoading(true)

    axios
      .put(`http://127.0.0.1:8000/api/suppliers/${editingId}/`, editForm, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setEditingId(null)
        fetchData() // Recarrega os dados após edição
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const getProductNames = (productIds) => {
    return productIds
      .map((id) => {
        const product = products.find((p) => p.id === id)
        return product ? product.name : `Produto ID ${id}`
      })
      .join(', ')
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
    return <div>Carregando fornecedores...</div>
  }

  if (error) {
    return <div>Erro: {error}</div>
  }

  return (
    <SuppliersContainer>
      <SuppliersTitle>Lista de Fornecedores</SuppliersTitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SuppliersTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Contato</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Telefone</TableHeaderCell>
            <TableHeaderCell>Endereço</TableHeaderCell>
            <TableHeaderCell>Produtos</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Atualizado em</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              {editingId === supplier.id ? (
                <TableCell colSpan='9'>
                  <EditForm onSubmit={handleEditSubmit}>
                    <FormGroup>
                      <label>Nome:</label>
                      <input
                        type='text'
                        name='name'
                        value={editForm.name}
                        onChange={handleEditChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Contato:</label>
                      <input
                        type='text'
                        name='contact_person'
                        value={editForm.contact_person}
                        onChange={handleEditChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Email:</label>
                      <input
                        type='email'
                        name='email'
                        value={editForm.email}
                        onChange={handleEditChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Telefone:</label>
                      <input
                        type='text'
                        name='phone'
                        value={editForm.phone}
                        onChange={handleEditChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Endereço:</label>
                      <input
                        type='text'
                        name='address'
                        value={editForm.address}
                        onChange={handleEditChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Produtos:</label>
                      <CheckboxGroup>
                        {products.map((product) => (
                          <label key={product.id}>
                            <input
                              type='checkbox'
                              checked={editForm.products.includes(product.id)}
                              onChange={(e) => {
                                const isChecked = e.target.checked
                                setEditForm((prev) => ({
                                  ...prev,
                                  products: isChecked
                                    ? [...prev.products, product.id]
                                    : prev.products.filter(
                                        (id) => id !== product.id,
                                      ),
                                }))
                              }}
                            />
                            {product.name}
                          </label>
                        ))}
                      </CheckboxGroup>
                    </FormGroup>

                    <ActionsContainer>
                      <SaveButton type='submit'>
                        Salvar <MdFileDownloadDone />
                      </SaveButton>
                      <CancelButton type='button' onClick={cancelEdit}>
                        Cancelar <MdOutlineCancel />
                      </CancelButton>
                    </ActionsContainer>
                  </EditForm>
                </TableCell>
              ) : (
                <>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.contact_person}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>
                    {supplier.products && supplier.products.length > 0
                      ? getProductNames(supplier.products)
                      : 'Nenhum produto'}
                  </TableCell>
                  <TableCell>
                    {supplier.is_active ? (
                      <ActiveStatus>Ativo</ActiveStatus>
                    ) : (
                      <InactiveStatus>Inativo</InactiveStatus>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(supplier.updated_at)}</TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <EditButton onClick={() => handleEdit(supplier)}>
                        Editar
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(supplier.id)}>
                        Excluir
                      </DeleteButton>
                    </ActionsContainer>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </tbody>
      </SuppliersTable>
    </SuppliersContainer>
  )
}

export default SupplierList
