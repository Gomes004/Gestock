import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import {
  ProductListContainer,
  ProductListTitle,
  ErrorMessage,
  ProductList,
  ProductItem,
  EditForm,
  FormGroup,
  PrimaryButton,
  DangerButton,
  SecondaryButton,
  ProductName,
  ProductDetail,
  CheckboxContainer,
} from './style'

function ProductListComponent() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editFormData, setEditFormData] = useState({
    code: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    current_stock: 0,
    minimum_stock: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    const token = localStorage.getItem('token') || Cookies.get('token')
    setLoading(true)
    axios
      .get('http://127.0.0.1:8000/api/products/', {
        headers: {
          Authorization: `Token ${token}`,
        },
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

  const handleDelete = (productId) => {
    const token = localStorage.getItem('token') || Cookies.get('token')
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      axios
        .delete(`http://127.0.0.1:8000/api/products/${productId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          fetchProducts()
        })
        .catch((error) => {
          setError(error.message)
        })
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product.id)
    setEditFormData({
      code: product.code,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      current_stock: product.current_stock,
      minimum_stock: product.minimum_stock,
      is_active: product.is_active,
    })
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditFormData({
      ...editFormData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token') || Cookies.get('token')

    axios
      .put(
        `http://127.0.0.1:8000/api/products/${editingProduct}/`,
        editFormData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        setEditingProduct(null)
        fetchProducts()
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  const cancelEdit = () => {
    setEditingProduct(null)
  }

  if (loading) {
    return <div>Carregando produtos...</div>
  }

  if (error) {
    return <div>Erro: {error}</div>
  }

  return (
    <ProductListContainer>
      <ProductListTitle>Lista de Produtos</ProductListTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ProductList>
        {products.map((product) => (
          <ProductItem key={product.id}>
            {editingProduct === product.id ? (
              <EditForm onSubmit={handleEditSubmit}>
                <FormGroup>
                  <label>Código:</label>
                  <input
                    type='text'
                    name='code'
                    value={editFormData.code}
                    onChange={handleEditChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Nome:</label>
                  <input
                    type='text'
                    name='name'
                    value={editFormData.name}
                    onChange={handleEditChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Descrição:</label>
                  <textarea
                    name='description'
                    value={editFormData.description}
                    onChange={handleEditChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Categoria:</label>
                  <input
                    type='text'
                    name='category'
                    value={editFormData.category}
                    onChange={handleEditChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Preço:</label>
                  <input
                    type='number'
                    name='price'
                    value={editFormData.price}
                    onChange={handleEditChange}
                    step='0.01'
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Estoque Atual:</label>
                  <input
                    type='number'
                    name='current_stock'
                    value={editFormData.current_stock}
                    onChange={handleEditChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Estoque Mínimo:</label>
                  <input
                    type='number'
                    name='minimum_stock'
                    value={editFormData.minimum_stock}
                    onChange={handleEditChange}
                    required
                  />
                </FormGroup>
                <CheckboxContainer>
                  <label>
                    <input
                      type='checkbox'
                      name='is_active'
                      checked={editFormData.is_active}
                      onChange={handleEditChange}
                    />
                    Ativo
                  </label>
                </CheckboxContainer>
                <div>
                  <PrimaryButton type='submit'>Salvar</PrimaryButton>
                  <SecondaryButton type='button' onClick={cancelEdit}>
                    Cancelar
                  </SecondaryButton>
                </div>
              </EditForm>
            ) : (
              <>
                <ProductName>{product.name}</ProductName>
                <ProductDetail>
                  <strong>Código:</strong> {product.code}
                </ProductDetail>
                <ProductDetail>
                  <strong>Descrição:</strong> {product.description}
                </ProductDetail>
                <ProductDetail>
                  <strong>Categoria:</strong> {product.category}
                </ProductDetail>
                <ProductDetail>
                  <strong>Preço:</strong> R$ {product.price}
                </ProductDetail>
                <ProductDetail>
                  <strong>Estoque:</strong> {product.current_stock}
                </ProductDetail>
                <ProductDetail>
                  <strong>Status:</strong> {product.stock_status}
                </ProductDetail>
                <ProductDetail>
                  <strong>Estoque mínimo:</strong> {product.minimum_stock}
                </ProductDetail>
                <div>
                  <PrimaryButton onClick={() => handleEdit(product)}>
                    Editar
                  </PrimaryButton>
                  <DangerButton onClick={() => handleDelete(product.id)}>
                    Deletar
                  </DangerButton>
                </div>
              </>
            )}
          </ProductItem>
        ))}
      </ProductList>
    </ProductListContainer>
  )
}

export default ProductListComponent
