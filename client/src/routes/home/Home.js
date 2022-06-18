import React from "react";

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import {dataStore} from "../../store/data";

export default function Home () {
    const {token} = dataStore()
    console.log(token,'ini dari home')
    return (
        <>
            <Navbar />
            <h1>Ini di Home</h1>
            <Footer />
        </>
    )
}