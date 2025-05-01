import PageSelector from '../../components/pageSelector'
import ReplenishmentList from '../../components/replenishList'
import CreateReplenishment from '../../components/replenishmentCreate'

function ReplenishmentsPage() {
  return (
    <div>
      <PageSelector
        pages={[
          { label: 'Pedidos de Reposição', component: <ReplenishmentList /> },
          {
            label: 'Criar pedido de reposição',
            component: <CreateReplenishment />,
          },
        ]}
      />
    </div>
  )
}

export default ReplenishmentsPage
