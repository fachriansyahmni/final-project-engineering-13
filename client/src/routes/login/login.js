import axios from "axios";
import React, { useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";

import { dataStore } from "../../store/data";

import MyModal from "../../components/Modal";

import './style.css'

export default function Login() {

    const navigate = useNavigate()

    const { token, setToken } = dataStore()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [modalShow, setModalShow] = useState(false)

    const onChangeEmail = (e) => {
        const value = e.target.value
        setUsername(value)
    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.length < 6) {
            alert('Password minimal 6 karakter');
        }
        if (password.length >= 6) {
            try {
                const response = await axios.post('http://localhost:8090/api/v1/auth/login',
                    {
                        email: username,
                        password: password
                    }
                )
                // console.log(response.data, 'kalau brhsl')
                console.log(response, 'dari login')
                setToken(response.data.data.token)
                navigate('/')
                // console.log('jalan')
            } catch (err) {
                // let error = err.response.data.error
                // if (error === 'USER_NOT_FOUND') {
                //     setModalShow(true)
                // }
                setModalShow(true)
                console.log(err)
            }
        }
    }

    return (
        <div className='loginBg'>
            <div className='container'>
                <div className="card row justify-content-center col-md-6 p-4 mx-auto">
                    <div className="card-header">
                        <h2>Ruang Event</h2>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" placeholder="Email" value={username} onChange={onChangeEmail} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={onChangePassword} minlength="8"/>
                        </div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-success" type="button" onClick={handleSubmit}>Sign In</button>
                            <NavLink to="/registrasi">
                                Don't have an account ? Click here!
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <MyModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}