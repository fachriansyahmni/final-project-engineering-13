import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Navbar from "../../components/Navbar"

export default function DetailEvent () {
    
    // id event no 16
    const [content, setContent] = useState('')
    let id = 16
    const getData = async () => {
        try {
            const response = await axios.get(`/api/v1/event?id=${id}`)
            console.log(response.data.data.content)
            setContent(response.data.data.content)
        } catch (e) {
            console.log(e)
        }
    }
    const navbar = <Navbar />  

    useEffect(() => {
    
        getData()
    
    }, [])

    return (
    <>
        {navbar}
        <div className='content container' dangerouslySetInnerHTML={{__html: content}}>  </div>
    </>
    )

}