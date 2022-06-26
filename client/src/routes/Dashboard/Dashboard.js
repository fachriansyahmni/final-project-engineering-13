import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import { dataUser, dataStore } from '../../store/data'

// import Card from '../../components/Card'

import CardDashboard from './CardDashboard';

import cameraIcon from "../../assets/default_pp.svg"
import axios from 'axios'

export default function Dashboard () {
    const { getUserData} = dataUser()
    const { token, setToken } = dataStore()

    const [data, setData] = useState({})

    const [myEvent, setMyevent] = useState([])

    const getMyEvent = async () => {
        try {
            const response = await axios.get('/api/v1/event/my-events', {
                headers: {
                    'Authorization': `${token}`
                }
            })
            // console.log(response, 'allevent i post')
            if (response.data.data !== null) {
                setMyevent(response.data.data)
            }
            // console.log(response.data, 'ini eventnya')
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            const response = await getUserData(token)
            setData(response.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData()
        getMyEvent()
    }, [])

    console.log(myEvent, 'event bersangkutan')

    return (
    <>
        <Navbar />
        <div className='container'>
            <h1>Dashboard</h1>
            <hr></hr>
            {
                data.photo ? (
                    <img className='d-block mx-auto rounded-circle border border-dark' src={data.photo} width="300px" height="300px"/>
                ) : (
                    <img className='d-block mx-auto rounded-circle' src={cameraIcon} width="300px" height="300px"/>
                )
            }
            <h4 className='text-center mt-3'>{data.first_name}</h4>
            <h3>My Event</h3>
            <hr></hr>
            {/* <button className='btn btn-outline-danger' onClick={() => {deleteEvent(1)}}>Sweet</button> */}
            <div className='d-flex flex-wrap gap-3'>
                {
                    myEvent.length > 0 ? 
                        myEvent.map((item, idx) => (
                            <CardDashboard banner={item.banner_img} id={item.id} price={item.price} title={item.title} key={idx} model={item.model} />
                        )) : (
                            <h3 className='text-center'>You're not post event yet</h3>
                        )
                }
            </div>
        </div>
        <Footer />
    </>    
    )
}