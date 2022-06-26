import React, { useState } from 'react';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios";

import { dataStore } from '../../store/data';

import swal from 'sweetalert'

const Register = () => {
    const [username,setUsername] = useState('');
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [photo, setPhoto] = useState(null)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const { setToken } = dataStore()

    const navigate = useNavigate()

    const onChangeUsername = (e) => {
        const value = e.target.value
        setUsername(value)
    }

    const onChangeFirstname = (e) => {
        const value = e.target.value
        setFirstname(value)
    }

    const onChangeLastname = (e) => {
        const value = e.target.value
        setLastname(value)
    }
        const onChangeEmail = (e) => {
           const value = e.target.value
         setEmail(value)
    }
    
    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const onChangePhoto = (e) => {
        const value = e.target.value
        setPhoto(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.length < 6) {
            alert('password minimal 6 karakter')
        }
        if (password.length >= 6) {
            try {
                const form = {
                    "email": email,
                    "username": username,
                    "first_name": firstname,
                    "last_name": lastname,
                    "photo": photo,
                    "password": password,
                    "contact": " "
                }
                const response = await axios.post('/api/v1/auth/register',form)
                
                // login section

                try {
                    const response = await axios.post('http://localhost:8090/api/v1/auth/login',
                        {
                            email: email,
                            password: password
                        }
                    )
                    setToken(response.data.data.token)
                    swal("Akun berhasil ditambahkan", "Anda akan dialihkan ke halaman home", "success")
                    .then((value) => {
                        navigate('/')
                    })
                } catch (e) {
                    swal("Action gagal", "error")   
                    console.log(e)
                }

                // login end
            } catch(err) {
                console.log(err.response)
                console.log(err.request)
                console.log(err.message)
            }
        }
    }



    return(
        <div className='registBg'>
            <div className='container'>
                <div className="card row justify-content-center col-md-6 p-4 mx-auto">
                    <div className="card-header">
                        <h2>Ruang Event</h2>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label  className="form-label">Username</label>
                            <input type="text" className="form-control"  placeholder="Username" value={username} onChange={onChangeUsername}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">First Name</label>
                            <input type="text" className="form-control"  placeholder="First Name" value={firstname} onChange={onChangeFirstname}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Last Name</label>
                            <input type="text" className="form-control"  placeholder="Last Name" value={lastname} onChange={onChangeLastname}/>
                        </div>
                        {/* <div className="mb-3">
                            <label  className="form-label">Photo URL</label>
                            <input type="text" className="form-control"  placeholder="Photo url" value={photo} onChange={onChangePhoto}/>
                        </div> */}
                        <div className="mb-3">
                            <label  className="form-label">Email</label>
                            <input type="email" className="form-control"  placeholder="Email" value={email} onChange={onChangeEmail}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Password</label>
                            <input type="password" className="form-control"  placeholder="Password" value={password} onChange={onChangePassword} minLength="6"/>
                        </div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-success" type="button" onClick={handleSubmit}>Registrasi</button>
                            <NavLink to="/login">
                                Already have an account? Click here!
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;