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
import Card from '../../components/Card';

export default function DetailEvent () {
    
    
    const [content, setContent] = useState('')
    const [data, setData] = useState({})
    const [category, setCategory] = useState(1)
    const param = useParams()
    let id = param.id
    const getData = async () => {
        try {
            const response = await axios.get(`/api/v1/event?id=${id}`)
            
            setContent(response.data.data.content)
            setData(response.data.data)
            setCategory(response.data.data.category_id)
        } catch (e) {
            console.log(e)
        }
    }

   

    const [recom, setRecom] = useState([]);

    const getDataRecomd = async (cat_id) => {
        try {
            const response = await axios.get(`/api/v1/event?category=${cat_id}`)
          
            let dataInner = response.data.data
            const filtered = dataInner.filter((item) => item.id !== parseInt(id))
      
            setRecom(filtered)
        } catch (e) {
            console.log(e)
        }
    }
   


    useEffect(() => {

        getData();
        getDataRecomd(category)
    }, [category, parseInt(id)])

    

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
            <div className='d-flex flex-wrap gap-3'>
                {
                    recom.length > 0 &&
                        recom.map((item, index) => (
                            <Card banner={item.banner_img} id={item.id} price={item.price} title={item.title} key={index} />
                        ))
                }
            </div>

        </div>
        <Footer />
    </>
    )

}