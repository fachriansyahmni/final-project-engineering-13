import React, {useState} from "react";

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import RichTextEditor from "../../components/RichTextEditor";
import axios from "axios";
import { Form } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

import { dataStore } from "../../store/data";

import swal from 'sweetalert'

export default function CreateEvent () {

    const {token} = dataStore()

    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState("");
    const [model, setModel] = useState(1);
    const [category, setCategory] = useState(1);
    const [content, setContent] = useState("");
    const [urlReg, setUrlReg] = useState("");
    const [loc, setLoc] = useState("");
    const [contact, setContact] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const reset = () => {
        setTitle("");
        setBanner("")
        setModel(1)
        setCategory(1);
        setContent("");
        setUrlReg("");
        setLoc("");
        setContact("")
        setPrice(0);
        setType(1);
        setDate('');
        setTime('');
    }

    const getValue = (value) => {
        setContent(value);
    };
    const getTitle = (e) => {
        setTitle(e.target.value)
    }
    const getBanner = (e) => {
        setBanner(e.target.value)
    }
    const getRegisterUrl = (e) => {
        setUrlReg(e.target.value)
    }
    const getLocation = (e) => {
        setLoc(e.target.value)
    }
    const getContact = (e) => {
        setContact(e.target.value)
    }
    const getPrice = (e) => {
        let num = parseInt(e.target.value)
        setPrice(num)
    }
    
    let active1 = (model === 1) ? 'active': ''
    let active2 = (model === 2) ? 'active': ''

    let activeType1 = (type === 1) ? 'active': ''
    let activeType2 = (type === 2) ? 'active': ''

    const data = {
        "title": title,
        "banner_img": banner,
        "content": content,
        "category_id": category, 
        "start_time_event": time, 
        "start_date_event": date,
        "contact": contact,
        "price": price,
        "type_event_id": type,
        "model_id": model,
        "location_details": loc,
        "register_url": urlReg
    }
   
    const handleSubmit = async (event) => {
        event.preventDefault()
      
        try {
            const response = await axios.post('/api/v1/event/create',data, {
                headers: {
                    'Authorization': `${token}`
                }
            })
          
            swal("Event telah berhasil dibuat", "success")
            reset()
        } catch (e) {
            console.log(e)
            swal("Event gagal dibuat", "error")
        }
    }

    return (
        <>
            <Navbar />
            <form className="container">
                <div className="row">
                    <div className="bg-light col-8 border border-dark rounded p-3">
                        <p><strong>Title</strong></p>
                        <input value={title} type="text" class="form-control mb-2" placeholder="Title" onChange={getTitle} required/>

                        {/* <div className="d-flex flex-column  mb-2">
                            <p><strong>Model</strong></p>
                            <div className="d-flex align-items-center flex-row gap-2">
                                <input type="radio" id="seminar" name="model" value="1" />
                                <label for="seminar">Event Seminar</label>
                            </div>
                            <div className="d-flex align-items-center flex-row gap-2">
                                <input type="radio" id="beasiswa" name="model" value="2" />
                                <label for="beasiswa">Event Beasiswa</label>
                            </div>
                        </div>                         */}
                        <p><strong>Model</strong></p>
                        <div class="list-group mb-3">
                            <button  type="button" className={`${active1} list-group-item list-group-item-action`} onClick={() => {setModel(1)}}>Event Seminar</button>
                            <button  type="button" className={`${active2} list-group-item list-group-item-action`} onClick={() => {setModel(2)}}>Event Beasiswa</button>
                        </div>

                        <p><strong>Banner</strong></p>
                        <input value={banner} type="text" className="form-control mb-2" placeholder="Banner Image Link" onChange={getBanner}/>

                        {/* <p><strong>Deskripsi</strong></p>
                        <input type="text" class="form-control mb-2" placeholder="Title" /> */}

                        <p><strong>Content</strong></p>
                        <RichTextEditor initialValue={content} getValue={getValue} />

                        <p><strong>Kategori</strong></p>
                        <Form.Select aria-label="Default select example" onChange={(e) => setCategory(parseInt(e.target.value))}>
                        <option>Pilih Kategori</option>
                        <option value={1}>Pendidikan</option>
                        <option value={2}>Hiburan</option>
                        <option value={3}>Kesehatan</option>
                        <option value={4}>Kuliner</option>
                        </Form.Select>

                        <p className="mt-3"><strong>Register URL</strong></p>
                        <input value={urlReg} type="text" class="form-control mb-2" placeholder="Register URL" onChange={getRegisterUrl}/>

                        {/* <div className="d-flex flex-column">
                            <p><strong>Tipe</strong></p>
                            <div className="d-flex align-items-center flex-row gap-2">
                                <input type="radio" id="online" name="tipe" value={1} checked={() => {setType(1)}} />
                                <label for="online">Online</label>
                            </div>
                            <div className="d-flex align-items-center flex-row gap-2">
                                <input type="radio" id="offline" name="tipe" value="2" />
                                <label for="offline">Offline</label>
                            </div>
                        </div> */}
                        <p><strong>Tipe</strong></p>
                        <div class="list-group mb-3">
                            <button type="button" className={`${activeType1} list-group-item list-group-item-action`} onClick={() => {setType(1)}}>Online</button>
                            <button type="button" className={`${activeType2} list-group-item list-group-item-action`} onClick={() => {setType(2)}}>Offline</button>
                        </div>

                        <p className="mt-3"><strong>Location</strong></p>
                        <input  value={loc} type="text" class="form-control mb-2" placeholder="Maps" onChange={getLocation}/>

                        <p className="mt-3"><strong>Contact</strong></p>
                        <input value={contact} type="text" class="form-control mb-2" placeholder="Phone Number" onChange={getContact}/>

                        <p className="mt-3"><strong>Price</strong></p>
                        <input value={price} type="number" class="form-control mb-2" placeholder="Price" onChange={getPrice}/>

                        <p><strong>Tanggal Event</strong></p>
                        {/* <DatePicker selected={date} onChange={(date) => setDate(date)}/> */}
                        <input value={date} className="d-block mb-3" type="date" min="2022-01-01" onChange={(date) => setDate(date.target.value)}></input>

                        <p><strong>Waktu</strong></p>
                        <input value={time} className="d-block mb-3" type="time" id="appt" name="appt" onChange={(time) => setTime(time.target.value)} required></input>
                        <button type="submit" onClick={handleSubmit} className="btn btn-outline-success">Submit</button>
                    </div>
                    <div className="col-4">
                        <p className="text-center"><strong>Syarat dan Ketentuan</strong></p>
                        <p>Sebelum melakukan daftarkan event, pastikan Anda telah membaca syarat dan ketentuan berikut:</p>
                        <ol>
                            <li>Event yang akan dipublikasikan tidak mengandung sara atau merugikan pihak perorangan maupun kelompok.</li>
                            <li>Dilarang mempublikasikan <i>fake</i> event</li>
                            <li>Dapat mendaftarkan event berbayar dengan mencantumkan harga dan jika FREE dapat diisi dengan 0 dalam form harga.</li>
                        </ol>
                    </div>
                </div>
            </form>
            <Footer />
        </>
    )
}