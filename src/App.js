import './App.css'
import Login from './components/User/Login'
import Register from './components/User/Register'
import ResetPassword from './components/User/ResetPassword'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  const RequireAuth = () => {
    return (sessionStorage.getItem('token'))?<Home/>:<Navigate to="/login"/>
    
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />
          } />
          <Route path="/login" element={<Login />
          } />
          <Route path="/signup" element={<Register />
          } />
          <Route path="/reset-password" element={<ResetPassword />
          } />
          <Route path="/home" element={<RequireAuth></RequireAuth>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
