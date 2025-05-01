import { useState, useEffect } from 'react'
import AppRoutes from './routes'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import GlobalStyle from './globalStyle'
import { ThemeProvider } from 'styled-components'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token') || Cookies.get('token')
    const role = localStorage.getItem('userRole') || Cookies.get('userRole')

    if (token) {
      setIsAuthenticated(true)
      if (role) {
        setUserRole(role)
      }
    }

    setLoading(false)
  }, [])

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('userRole')
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    setIsAuthenticated(false)
    setUserRole(null)
    toast.success('Logout realizado com sucesso!')
  }

  const theme = {
    colors: {
      primary: '#0070f3',
      secondary: '#1f2937',
      background: '#ffffff',
      text: '#333333',
    },
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <GlobalStyle />
        <AppRoutes
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          setIsAuthenticated={setIsAuthenticated}
          setUserRole={setUserRole}
          handleLogout={handleLogout}
          loading={loading}
        />
      </ThemeProvider>
    </>
  )
}

export default App
