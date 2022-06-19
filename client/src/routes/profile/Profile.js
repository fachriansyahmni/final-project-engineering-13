import React, { useEffect } from "react";

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { dataUser, dataStore } from "../../store/data";

export default function Profile () {
    const { username, name, email, photo, getUserData} = dataUser()
    const { token, setToken } = dataStore()

    useEffect(() => {

        
        const getData = async () => {
            try {
            const response = await getUserData(token)
            console.log(response, 'dari profile')
            } catch (e) {
            // skenario 1 saat token expired dan harus login lagi maka kembali ke home dan set token ke null
            console.log(e)
            }
        }

        getData()
    },[])

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Profile</h1>
                <hr></hr>
            </div>

            <Footer />
        </>
    )
}