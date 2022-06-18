// import { Button } from "bootstrap";
// import React from "react";
// import { NavLink } from "react-router-dom";
// import axios from "axios"

// import dataStore from "../store/data";

// export default function Main () {

//     const {token, setToken} = dataStore() 

//     const handleLogout = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post('api/v1/auth/logout',token)
//             console.log('berhasil logout')
//             setToken(null)
//         }catch (e) {
//             console.log(e)
//         }
//     }

//     let button

//     if (token != null) {
//         // <NavLink to={'/logout'} className="nav-link">Login</NavLink>
//         button = <button onClick={handleLogout}>Log out</button>
//     } else {
//         button = <NavLink to={'/login'} className="nav-link">Login</NavLink>
//     }

//     return (
//         <>
//             <nav class="navbar navbar-expand-lg navbar-light bg-light">
//                 <div class="container">
//                     <a class="navbar-brand" href="/">Ruang Event</a>
//                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                     </button>
//                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul class="navbar-nav ms-auto  center">
//                             <li class="nav-item">
//                                 {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
//                                 <NavLink to={'/'} className="nav-link">Home</NavLink>
//                             </li>

//                             <li class="nav-item dropdown">
//                             <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 Explore
//                             </a>
//                             <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
//                                 <li><a class="dropdown-item" href="#">Seminar</a></li>
//                                 <li><hr class="dropdown-divider" /></li>
//                                 <li><a class="dropdown-item" href="#">Beasiswa</a></li>
//                                 <li><hr class="dropdown-divider" /></li>
//                                 <li><a class="dropdown-item" href="#">Job Fair</a></li>
//                             </ul>
//                             </li>

//                             <li class="nav-item">
//                             <a class="nav-link" href="#">Tentang Kami</a>
//                             </li>

//                             <li class="nav-item">
//                                 {/* <a class="nav-link" href="/bantuan">Bantuan</a> */}
//                                 <NavLink to={'/bantuan'} className="nav-link">Bantuan</NavLink>
//                             </li>
//                         </ul>
//                         {/* <form class="d-flex">
//                             <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                             <button class="btn btn-outline-success" type="submit">Search</button>
//                         </form> */}
//                         {/* <button type="button" class="btn btn-outline-success" >Sign In</button> */}
//                         {
                            
//                         }
//                         {button}
//                     </div>
//                 </div>
//             </nav>
//         </>
//     )
// }

import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"

import { dataStore, dataUser} from "../store/data";

import defaultProfilePics from "../assets/default_pp.svg"

import Style from "./NavbarProfile.module.scss"

export default function Main () {

    const {token, setToken} = dataStore() 
    const {name, photo, getUserData} = dataUser()
    //console.log(name,photo)
    const [show, setShow] = useState(false)

    const handleLogout = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8090/api/v1/auth/logout',token)
            console.log('berhasil logout')
            setToken(null)
        }catch (e) {
            console.log(e)
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

    useEffect(() => {
        console.log(token)
        getUserData(token)
    }, [token])    

    if (token != 'Bearer null') {
        button = <div className={Style['navbar-profile'] + " ms-lg-2 d-flex flex-column gap-2 rounded p-1 position-relative"} onClick={() => {setShow(!show)}}>
            <div className={"d-flex flex-row"}>
                <div className="d-none d-lg-flex align-items-center" style={{color: '#fff'}}>
                    Name
                </div>
                <img src={defaultProfilePics} />
            </div>
            <div className={Style['modal-profile'] + profileModal + " rounded"}>
                <ul className="d-flex gap-1 flex-column"> 
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
                <div class="container">
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
                                <li><a class="dropdown-item" href="#">Seminar</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Beasiswa</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Job Fair</a></li>
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

