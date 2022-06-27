import './App.css';
import { Route, Routes, Router } from 'react-router-dom';


import Home from './routes/home/Home';
import Helpdesk from './routes/helpdesk/Helpdesk'
import Login from './routes/login/login';
import Register from './routes/register/register'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './routes/protectedRoutes/ProtectedRoute';
import Profile from './routes/profile/Profile';
import NotFound from './routes/notfound/NotFound';
import CreateEvent from './routes/create_event/CreateEvent';
import Seminar from './routes/Seminar/Seminar';

import { dataStore } from './store/data';
import DetailEvent from './routes/detail_event/DetailEvent';
import Beasiswa from './routes/beasiswa/Beasiswa';
import Dashboard from './routes/Dashboard/Dashboard';
import UpdateEvent from './routes/update_event/UpdateEvent';
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

      <Route path='/event/seminar'>
        <Route index element={<Seminar />} />
        <Route path=':id' element={<DetailEvent />} />
      </Route>
      <Route path='/event/beasiswa'>
        <Route index element={<Beasiswa />} />
        <Route path=':id' element={<DetailEvent />} />
      </Route>

      <Route path='/tentangkami' element={<Helpdesk />} />
      <Route path='/profile' element={ <ProtectedRoute token={token} child={<Profile />} />} />
      <Route path='/dashboard' element={<ProtectedRoute token={token} child={<Dashboard />} />} />
      <Route path='/dashboard/update/:id' element={<ProtectedRoute token={token} child={<UpdateEvent />} /> }/>
      <Route path='/event/create' element={<ProtectedRoute token={token} child={<CreateEvent />} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </>
    // {/* </Router> */}
  )
}

export default App;
