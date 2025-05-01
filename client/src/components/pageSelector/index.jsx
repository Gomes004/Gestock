import { useState } from 'react'
import { TabsContainer, TabsHeader, TabButton, TabContent } from './style'

const PageSelector = ({ pages }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  if (!pages || !Array.isArray(pages)) {
    return <div>Erro: pages deve ser um array válido</div>
  }

  if (pages.length === 0) {
    return <div>Nenhuma página disponível</div>
  }

  return (
    <TabsContainer>
      <TabsHeader>
        {pages.map((page, index) => (
          <TabButton
            key={index}
            onClick={() => setCurrentPageIndex(index)}
            $isActive={currentPageIndex === index}
          >
            {page.label}
          </TabButton>
        ))}
      </TabsHeader>

      <TabContent>{pages[currentPageIndex].component}</TabContent>
    </TabsContainer>
  )
}

export default PageSelector
