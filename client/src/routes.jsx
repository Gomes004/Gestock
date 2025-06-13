import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Register from './pages/register'
import ConfirmEmail from './pages/confirmRegister'
import Login from './pages/login'
import AuthRoute from './components/authRoute'
import Dashboard from './pages/dashboard'
import Header from './components/header'
import EditProfile from './pages/editUser'
import ForgotPassword from './pages/forgetPassword'
import ResetPassword from './pages/resetPassword'
import ProductsPage from './pages/products'
import SuppliersPage from './pages/suppliers'
import ReplenishmentsPage from './pages/replenishments'
import UserManagement from './pages/userManagement'

const AppRoutes = ({
  isAuthenticated,
  userRole,
  setIsAuthenticated,
  handleLogout,
  loading,
}) => {
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/confirm-email/:token' element={<ConfirmEmail />} />
        <Route
          path='/login'
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        <Route
          element={
            <AuthRoute
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              allowedRoles={['stock_operator', 'manager', 'admin']}
              loading={loading}
            />
          }
        >
          <Route
            path='/dashboard'
            element={<Dashboard userRole={userRole} />}
          />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route
            path='/products'
            element={<ProductsPage userRole={userRole} />}
          />
        </Route>

        <Route
          element={
            <AuthRoute
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              allowedRoles={['admin']}
              // allowedRoles={['stock_operator', 'manager', 'admin']}
              loading={loading}
            />
          }
        >
          <Route path='/suppliers' element={<SuppliersPage />} />
          <Route path='/replenishments' element={<ReplenishmentsPage />} />
          <Route path='/users-management' element={<UserManagement />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
