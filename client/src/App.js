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
import NotFound from './routes/notfound/NotFound';
import CreateEvent from './routes/create_event/CreateEvent';
import Seminar from './routes/Seminar/Seminar';

import { dataStore } from './store/data';
import { useEffect } from 'react';
import DetailEvent from './routes/detail_event/DetailEvent';
function App() {

  const {token} = dataStore()

//   const data = {
//     "title": 'integrasi',
//     "banner_img": "some link banner img",
//     "content": '',
//     "category_id": 1,
//     "start_time_event": "08:00",
//     "start_date_event": "2022-01-25",
//     "contact":"082136846231",
//     "price": 0,
//     "type_event_id": 1,
//     "model_id": 1,
//     "location_details": "location_details",
//     "register_url": "link registrasi"
// }
// console.log(token, 'token di createevent')
// console.log(data)
// const handleSubmit = async (event) => {
// // event.preventDefault()
// console.log('jaan')
// try {
//     const response = await axios.post('/api/v1/event/create', {
//         headers: {
//             // 'Authorization': `${token}`
//             // 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2NTU4OTc2NzAsImlkIjoxMSwidXNlcm5hbWUiOiJha3VuZGVtbyJ9.W4GIT-eFi4gxmkWxSkapd-z8xO0xdBH2lh4lDCrknUM"
//             'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2NTU4OTkwMDEsImlkIjoxLCJ1c2VybmFtZSI6InVzZXIifQ.4-svfRG0ahrEYVwukvOflWAdzaBqyBFYgX830sYc4Bw`
//         },
//         body: data
//     })
//     console.log(response)
// } catch (e) {
//     console.log(e, 'dari home')
// }
// }
//   useEffect(() => {
//     handleSubmit()
//   },[])

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
        <Route index element={(<><h1>Ini di event list beasiswa</h1></>)} />
        <Route path=':id' element={(<><h1>Ini dah masuk ke detail event beasiswa</h1></>)} />
      </Route>

      <Route path='/bantuan' element={<Helpdesk />} />
      <Route path='/profile' element={ <ProtectedRoute token={token} child={<Profile />} />}/>
      <Route path='/event/create' element={<ProtectedRoute token={token} child={<CreateEvent />} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </>
    // {/* </Router> */}
  )
}

export default App;
