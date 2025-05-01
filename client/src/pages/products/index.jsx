import PageSelector from '../../components/pageSelector'
import ProductListComponent from '../../components/productList'
import CreateProductComponent from '../../components/productCreate'
import StockMovementComponent from '../../components/stockMovment'

function ProductsPage({ userRole }) {
  var pagesArray = [
    { label: 'Movimentações', component: <StockMovementComponent /> },
  ]

  if (userRole !== 'stock_operator') {
    pagesArray = [
      { label: 'Produtos', component: <ProductListComponent /> },
      { label: 'Movimentações', component: <StockMovementComponent /> },
      { label: 'Criar Produto', component: <CreateProductComponent /> },
    ]
  }

  return (
    <div>
      <PageSelector pages={pagesArray} />
    </div>
  )
}

export default ProductsPage
