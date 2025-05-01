import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = ({ isAuthenticated, userRole, allowedRoles, loading }) => {
  if (loading) {
    return <div>Carregando...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  console.log(userRole)
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to='/unauthorized' replace />
  }

  return <Outlet />
}

export default AuthRoute
