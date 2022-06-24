import axios from 'axios';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser'


import Navbar from "../../components/Navbar"
import Footer from '../../components/Footer'

import calendarIcon from "../../assets/detail_event/calendar.png"
import bookmarkIcon from "../../assets/detail_event/bookmark.png"
import clockIcon from "../../assets/detail_event/clock.png"
import hyperlink from "../../assets/detail_event/hyperlink.png"
import mapsIcon from "../../assets/detail_event/maps.png"
import priceIcon from "../../assets/detail_event/price.png"
import { useParams } from 'react-router-dom';

export default function DetailEvent () {
    
    // id event no 16
    const [content, setContent] = useState('')
    const [data, setData] = useState({})
    const param = useParams()
    let id = param.id
    const getData = async () => {
        try {
            const response = await axios.get(`/api/v1/event?id=${id}`)
            // console.log(response.data.data.content)
            setContent(response.data.data.content)
            setData(response.data.data)
        } catch (e) {
            console.log(e)
        }
    }


    const [recom, setRecom] = useState([]);

    let cat = 1

    const getDataRecomd = async () => {
        try {
            const response = await axios.get(`/api/v1/event?category=${cat}`)
            // console.log(response.data.data, 'recom')
            let data = response.data.data
            console.log(data, 'data')
            // setContent(response.data.data.content)
            const filtered = data.filter((item) => item.id !== id)
            // console.log(filtered, 'filtered')
            setRecom(...filtered)
        } catch (e) {
            console.log(e)
        }
    }
    console.log(recom, 'recom')


    useEffect(() => {
    
        getData();
        getDataRecomd();
    }, [])

    // console.log(data)

    return (
    <>
        <Navbar />
        <div className='container'>
            <div className='d-flex gap-3'>
                <div>
                    <img src={data.banner_img} width="300px"/>
                </div>
                <div className='ms-4'>
                    <h3>{data.title}</h3>
                    <div className='d-flex mt-3'>
                        <div>
                            <img src={bookmarkIcon} height='50px' />
                        </div>
                        <div className='ms-2'>
                            <p><strong>Model</strong><br/>
                            Seminar</p>
                        </div>
                    </div>
                    <div className='d-flex mt-3'>
                        <div>
                            <img src={calendarIcon} height='50px' />
                        </div>
                        <div className='ms-2'>
                            <p><strong>Tanggal Event</strong> <br />
                            {data.start_date_event}</p>
                        </div>
                    </div>
                    <div className='d-flex mt-3'>
                        <div>
                            <img src={clockIcon} height='50px' />
                        </div>
                        <div className='ms-2'>
                            <p><strong>Waktu Event dimulai</strong> <br />
                            {data.start_time_event}</p>
                        </div>
                    </div>
                    <div className='d-flex mt-3'>
                        <div>
                            <img src={mapsIcon} height='50px' />
                        </div>
                        <div className='ms-2'>
                            <p><strong>Tempat</strong> <br />
                            {data.location_details}</p>
                        </div>
                    </div>
                    <div className='d-flex mt-3'>
                        <div>
                            <img src={hyperlink} height='50px' />
                        </div>
                        <div className='ms-2'>
                            <p><strong>Link Registrasi</strong> <br />
                            <a href={`${data.register_url}`} target="_blank">{`${data.register_url}`}</a></p>
                        </div>
                    </div>
                    <div className='d-flex mt-3'>
                        <div>
                            <img src={priceIcon} height='50px' />
                        </div>
                        <div className='ms-2'>
                            <p><strong>Harga</strong> <br />
                            {data.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            {parse(content)}
            <p><strong>Recommended</strong></p>
        </div>
        <Footer />
    </>
    )

}