import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import RichTextEditor from "../../components/RichTextEditor";
import JoditEditor from "jodit-react";
import swal from 'sweetalert'

import { dataStore } from "../../store/data";


// const formData = {
//     title: "",
//     banner_img: ""
// }

export default function UpdateEvent () {
    let param = useParams()
    let id = parseInt(param.id)

    const { token } = dataStore()

    const navigate = useNavigate()

    // const [data, setData] = useState({})

    const [form, setForm] = useState({})
    const [content, setContent] = useState('')
    // const [model_id, setModel] = useState('')

    const getData = async () => {
        try {
            const response = await axios.get(`/api/v1/event?id=${id}`)
            console.log(response.data.data)
            const data = response.data.data
            // setData(data)
            delete data.author
            delete data.category
            delete data.type_event
            // setModel(data.model)
            setForm({
                ...data,
                'model_id': 'event seminar' ? 1 : 2
            })
            // setTitle(data.title)
            // setBanner(data.banner_img) 
        } catch (e) {
            console.log(e)
        }
    }

    const onChange = (e) => {
        let { name, value} = e.target;
        if (name === 'type_event_id' || name === 'category_id' || name === 'model_id' || name === 'price') {
            value = parseInt(value)
        }
        setForm({
            ...form,
            [name]: value,
        });
    };

    const onChangeDesk = (value) => {
        setContent(value)
        setForm({
            ...form,
            'content': value,
        })
    }

    const updateEvent = async () => {
        try {
            const response = await axios.put('/api/v1/event/update', form, {
                headers: {
                    "Authorization": `${token}`
                }
            })
            // tambahi kalau berhali alert update event
            console.log(response)
            console.log('akan diupdae')
            // swal("Event telah diupdate", "Anda akan dialihkan ke halaman dashboard.", "success");
            swal("Event telah diperbarui", "Anda akan dialihkan ke halaman dashboard.", "success")
            .then((value) => {
                navigate('/dashboard')
            });
        } catch (e) {
            // tamnbahi aler gagal update event
            swal("Event gagal diperbarui", "error")
        }
    }

    const handleSubmit = () => {
        swal({
            title: "Anda ingin mengupdate event ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
        .then((willupdate) => {
            if (willupdate) {
                updateEvent()
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    // console.log(data, 'isi dari datanya')
    console.log(form, 'sisi form')
    console.log(content, 'isi dari content')
    // console.log(title, 'isi judul')
    // console.log(banner, 'isi banner')

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Edit event</h1>
                <hr></hr>
                <form className="row">
                    <div className="col-12">
                        <label className="form-label" for="update-title">Nama Event</label>
                        <input className="form-control" id="update-title" name="title" type={"text"} value={form.title} onChange={onChange} />
                    </div>
                    <div className="col-12 mt-3">
                        <label className="form-label" for="update-banner">Poster Gambar Event</label>
                        <input className="form-control" id="update-banner" name="banner_img" type={"url"} value={form.banner_img} onChange={onChange} />
                    </div>
                    <div className="col-4 mt-3">
                        <label className="form-label" for="update-model">Model</label>
                        <select id="update-model" className="form-select" name="model_id" onChange={onChange}>
                            <option value={1} selected={form.model === 'event seminar'}>Event Seminar</option>
                            <option value={2} selected={form.model === 'beasiswa'}>Beasiswa</option>
                            {/* <option value={3} selected={form.category_id === 3}>Kesehatan</option> */}
                            {/* <option value={4} selected={form.category_id === 4}>Kuliner</option> */}
                        </select>
                    </div>
                    <div className="col-4 mt-3">
                        <label className="form-label" for="update-cat">Kategori</label>
                        <select id="update-cat" className="form-select" name="category_id" onChange={onChange}>
                            <option value={1} selected={form.category_id === 1}>Pendidikan</option>
                            <option value={2} selected={form.category_id === 2}>Hiburan</option>
                            <option value={3} selected={form.category_id === 3}>Kesehatan</option>
                            <option value={4} selected={form.category_id === 4}>Kuliner</option>
                        </select>
                    </div>
                    <div className="col-3 mt-3">
                        <label className="form-label" for="update-tipe">Tipe</label>
                        <div id="update-tipe">
                            <div className="form-check">
                                <input className="form-check-input" id="type_1" name="type_event_id" type={"radio"} value={1} onChange={onChange} checked={form.type_event_id === 1}/>
                                <label className="form-check-label" for="type_1">
                                    Online
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" name="type_event_id" id="type_2" type={"radio"} value={2} onChange={onChange} checked={form.type_event_id === 2}/>
                                <label className="form-check-label" for="type_2">
                                    Offline
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <label className="form-label" for="update-desk">Deskripsi Event</label>
                        <div id="update-desk">
                            <RichTextEditor initialValue={form.content} getValue={onChangeDesk}/>
                        </div>
                    </div>
                    <div className="col-4 mt-3">
                        <label className="form-label" for="update-date">Tanggal Event</label>
                        <input className="form-control" id="update-date" type={"date"} name="start_date_event" value={form.start_date_event} onChange={onChange}/>
                    </div>
                    <div className="col-4 mt-3">
                        <label className="form-label" for="update-time">Waktu Event</label>
                        <input className="form-control" id="update-time" type={"time"} name="start_time_event" value={form.start_time_event} onChange={onChange}/>
                    </div>
                    <div className="col-4 mt-3">
                        <label className="form-label" for="update-price">Harga</label>
                        <input className="form-control" id="update-price" type={"number"} name="price" min={"0"} value={form.price} onChange={onChange} aria-describedby="priceHelp"/>
                        <div id="priceHelp" class="form-text">Harga dalam rupiah (isi 0 untuk gratis).</div>
                    </div>
                    <div className="col-7 mt-3">
                        <label className="form-label" for="update-location">Lokasi</label>
                        <input className="form-control" id="update-location" name="location_details" type={"text"} value={form.location_details} onChange={onChange} />
                    </div>
                    <div className="col-4 mt-3">
                        <label className="form-label" for="update-contact">Contact</label>
                        <input className="form-control" id="update-contact" name="contact" type={"text"} value={form.contact} onChange={onChange} />
                        <div id="contactHelp" class="form-text">No telepon.</div>
                    </div>
                    <div className="col-5 mt-1">
                        <label className="form-label" for="update-register">Register URL</label>
                        <input className="form-control" id="update-register" name="register_url" type={"text"} value={form.register_url} onChange={onChange} />
                    </div>
                    <div className="mt-3">
                        <button type="button" class="btn btn-outline-success" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}