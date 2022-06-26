import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"

import { dataStore, dataUser} from "../store/data";

import defaultProfilePics from "../assets/default_pp.svg"

import Style from "./NavbarProfile.module.scss"
import Style2 from "./Navbar.module.scss" 


export default function Main () {

    const {token, setToken} = dataStore()
    
    const [name, setName] = useState('name')
    const [photo, setPhoto] = useState(null)

    // console.log(name,photo, 'dari navbarrrr')

    const {getUserData} = dataUser()
    //console.log(name,photo)
    const [show, setShow] = useState(false)

    const handleLogout = async (event) => {
        event.preventDefault();
        console.log('logout')
        try {
            const response = await axios.post('http://localhost:8090/api/v1/auth/logout',token)
            console.log('berhasil logout')
            // setToken(null)
        }catch (e) {
            console.log(e)
        } finally {
            setToken(null) // jaga" kalau token kadaluarsa
        }
    }
    
    const showProfileModal = () => {
        if (show === false) {
            return ' d-none'
        } else {
            return ' show'
        }
    }

    let profileModal = showProfileModal()

    let button

    const loadPhoto = (param) => {
        try {
            const img = <img className={Style2['img-profile-nav']} src={param} alt="profile_pics"/>
            return img
        } catch (e) {
            return <img className={Style2['img-profile-nav']} src={defaultProfilePics} />
        }
    }

    useEffect(() => {
        //console.log(token)
        const getData = async () => {
            try {
            const response = await getUserData(token)
            // console.log(response, 'dariii navbar')
            setName(response?.data?.data?.first_name)
            setPhoto(response?.data?.data?.photo)
            } catch (e) {
                console.log(e)
            }
            
        }

        getData()
    }, [token])    

    if (token != 'Bearer null') {
        button = <div className={Style['navbar-profile'] + " ms-lg-2 d-flex flex-column gap-2 rounded p-1 position-relative"} onClick={() => {setShow(!show)}}>
            <div className={"d-flex flex-row gap-2"}>
                <div className="d-none d-lg-flex align-items-center" style={{color: '#fff'}}>
                    {name}
                </div>
                {/* <img className={Style2['img-profile-nav']} src={photo === 'link photo' ? defaultProfilePics: photo} /> */}
                {/* {loadPhoto(photo)} */}
                {/* <img 
                    src={photo}
                    alt="Profile Photo"
                    onError={event => {
                        event.onerror = null
                        event.target.src = "../assets/default_pp.svg"
                        
                    }}
                /> */}
                {/* <object data={photo} type="image/png"> */}
                    { photo ? (
                        <img className={Style2['img-profile-nav']} src={photo}/>
                    ) : (
                        <img className={Style2['img-profile-nav']} src={defaultProfilePics}/>
                    ) }
                {/* </object> */}
            </div>
            <div className={Style['modal-profile'] + profileModal + " rounded"}>
                <ul className="d-flex gap-1 flex-column"> 
                    <li><NavLink to={'/dashboard'} className="navLink-profile">Dashboard</NavLink></li>
                    <li><NavLink to={'/profile'} className="navLink-profile">Profile</NavLink></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
        </div>
    } else {
        button = <NavLink to={'/login'} className="nav-link">Login</NavLink>
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container p-0">
                    <a class="navbar-brand" href="/">Ruang Event</a>
                    <div className="d-flex flex-row gap-2">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={"d-flex align-items-center d-lg-none"}>
                            {button}
                        </div>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto  center">
                            <li class="nav-item">
                                {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                                <NavLink to={'/'} className="nav-link">Home</NavLink>
                            </li>

                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Explore
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                {/* <li><a class="dropdown-item" href="#">Seminar</a></li> */}
                                <li><NavLink to={'/event/seminar'} className="dropdown-item">Seminar</NavLink></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><NavLink to={'/event/beasiswa'} className="dropdown-item">Beasiswa</NavLink></li>
                                {/* <li><a class="dropdown-item" href="#">Beasiswa</a></li> */}
                                {/* <li><hr class="dropdown-divider" /></li> */}
                                {/* <li><a class="dropdown-item" href="#">Job Fair</a></li> */}
                            </ul>
                            </li>

                            <li class="nav-item">
                            <a class="nav-link" href="#">Tentang Kami</a>
                            </li>

                            <li class="nav-item">
                                <NavLink to={'/bantuan'} className="nav-link">Bantuan</NavLink>
                            </li>
                        </ul>
                        {button}
                    </div>
                   
                </div>
            </nav>
        </>
    )
}

