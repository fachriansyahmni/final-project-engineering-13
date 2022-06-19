import logo from './logo.svg';
import './App.css';
import { Route, Routes, Router } from 'react-router-dom';
import Home from './routes/home/Home';
import Helpdesk from './routes/helpdesk/Helpdesk'
import Login from './routes/login/login';
import Register from './routes/register/register'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './routes/protectedRoutes/ProtectedRoute';
import Profile from './routes/profile/Profile';
import { dataStore } from './store/data';
function App() {

  const {token} = dataStore()

  return (
    // <Router>
    <>
    <Routes>
    <Route path='/' element={<Home />} />
        {/* <Route path="/bantuan" element={<Helpdesk />} /> */}
      <Route path='/login' element={<Login />} /> 
      <Route path='/registrasi' element={<Register />} />
      <Route path='/bantuan' element={<Helpdesk />} />
      <Route path='/profile' element={ <ProtectedRoute token={token} child={<Profile />} />}/>
    </Routes>
    </>
    // {/* </Router> */}
  )
}

export default App;
