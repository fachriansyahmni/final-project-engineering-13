import React from "react";

import { Link, useNavigate } from "react-router-dom";

import Style from './Style.module.scss'

import trashIcon from '../../assets/trash.png'
import editIcon from "../../assets/edit.png"

import { dataStore } from "../../store/data";

import swal from 'sweetalert'
import axios from "axios";

export default function CardDashboard ({banner, id, price, title, model}) {

    const { token } = dataStore()

    const navigate = useNavigate()
    
    const deleteEvent = async (id) => {
        console.log(id, 'about deleted')
        try {
            // some axios await api here
            // const response = await axios.delete('/api/v1/event/delete', {headers,data})
            const response = await axios.delete('/api/v1/event/delete', {
                headers: {
                    Authorization: `${token}`
                  },
                data: {
                    id: id 
                  }
            })
            // const response = await axios.delete('/api/v1/event/delete', { data: { id: 0 }, headers: { "Authorization": `${token}` } });

            console.log(response)
            swal({
                title: "Event telah dihapus",
                icon: "success",
                button: "Back",
              });
        } catch (e) {
            console.log(e)
            swal({
                title: "Event gagal dihapus",
                icon: "error",
                button: "Back",
              });
        }
    }

    const onDeleteValidate = () => {
        swal({
            title: "Anda ingin menghapus event ?",
            text: "Setelah terhapus, anda tidak bisa memulihkannya lagi.",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
        .then((willdelete) => {
            if (willdelete) {
                deleteEvent(id)
            } 
            // else {
            //     swal({title: "Event batal dihapus"})
            // }
        })
    }
    

    let free = (price === 0 ? Style['free'] : Style['falseDisplay'])
    if (model === 'beasiswa') {
    return (
        <div className="position-relative">
        <Link to={`/event/beasiswa/${id}`}>
            <div className={'card d-inline-block position-relative'}>
                <p className={free}>Free</p>
                <div className="">
                    <img src={banner} />
                </div>
                <div className={Style["titleEvent"] + ' px-1'}>
                    {title}
                    {/* The 56th MarkPlus Goes to Campus “Entrepreneurial Marketing" */}
                </div>
                
            </div>
        </Link>
            <div className={Style['block-btn'] + ' d-flex gap-2'}>
                    {/* bisa diganti pakai logo aja biar kecil */}
                    <button className={'btn btn-success'} onClick={() => {navigate(`/dashboard/update/${id}`)}}><span><img src={editIcon} width="20px" height="20px"/></span></button>
                    <button className={'btn btn-danger'} onClick={onDeleteValidate}><span><img src={trashIcon} width="20px" height="20px"/></span></button>
            </div>
        </div>
    )} else {
        return (
        <div className="position-relative">
        <Link to={`/event/seminar/${id}`}>
            <div className={'card d-inline-block position-relative'}>
                <p className={free}>Free</p>
                <div className="">
                    <img src={banner} />
                </div>
                <div className={Style["titleEvent"] + ' px-1'}>
                    {title}
                    {/* The 56th MarkPlus Goes to Campus “Entrepreneurial Marketing" */}
                </div>
                
            </div>
        </Link>
            <div className={Style['block-btn'] + ' d-flex gap-2'}>
                    {/* bisa diganti pakai logo aja biar kecil */}
                    <button className={'btn btn-success'} onClick={() => {navigate(`/dashboard/update/${id}`)}} ><span><img src={editIcon} width="20px" height="20px"/></span></button>
                    <button className={'btn btn-danger'} onClick={onDeleteValidate}><span><img src={trashIcon} width="20px" height="20px"/></span></button>
            </div>
        </div>
        )
    }
}