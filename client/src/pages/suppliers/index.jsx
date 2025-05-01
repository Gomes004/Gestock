import PageSelector from '../../components/pageSelector'
import CreateSupplier from '../../components/supplierCreate'
import SupplierList from '../../components/suppliersList'

function SuppliersPage() {
  return (
    <div>
      <PageSelector
        pages={[
          { label: 'Fornecedores', component: <SupplierList /> },
          { label: 'Criar Fornecedor', component: <CreateSupplier /> },
        ]}
      />
    </div>
  )
}

export default SuppliersPage
