import React, { useEffect, useState } from "react";

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { dataUser, dataStore } from "../../store/data";

import defaultPics from "../../assets/default_pp.svg"
import cameraIcon from "../../assets/camera.svg"

import Style from './Profile.module.scss'
import ProfileModal from "../../components/ProfileModal";
import PhotoProfileModal from "../../components/PhotoProfileModal";

export default function Profile () {
    const { getUserData} = dataUser()
    const { token, setToken } = dataStore()

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showPhotoModal, setShowPhotoModal] = useState(false)
    const handleClosephotoModal = () => setShowPhotoModal(false)
    const handleShowPhotoModal = () => setShowPhotoModal(true)


    const [changeData, setChangeData] = useState(false)
    const handleSubmit = () => setChangeData(true)


    const [data, setData] = useState({})

    useEffect(() => {


        const getData = async () => {
            try {
            const response = await getUserData(token)
            setData(response.data.data)
            console.log(response, 'dari profile')
            } catch (e) {
            // skenario 1 saat token expired dan harus login lagi maka kembali ke home dan set token ke null
            console.log(e)
            }
        }

        getData()
    },[changeData])

    return (
        <>
            <Navbar />

            <ProfileModal show={show} handleClose={handleClose} data={data} handleSubmit={handleSubmit}/>

            <PhotoProfileModal show={showPhotoModal} handleClose={handleClosephotoModal} handleSubmit={handleSubmit} />

            <div className="container">
                <h1>Profile</h1>
                <hr></hr>
                <div className="row">
                    <div className="col">
                        {/* {data.photo ? (
                            <img className={Style['img']} src={data.photo} alt=""/>
                        ) : (
                            <img className={Style['img']} src={defaultPics} alt=""/>
                        )} */}
                        {data.photo ? (
                            <div className={Style["profilepic"]} onClick={handleShowPhotoModal}>
                            <img className={Style['profilepic__image']} src={data.photo} width="300px" height="300px" alt="Profibild" />
                            <div className={Style["profilepic__content"]}>
                                {/* <span class="profilepic__icon"><i class="fas fa-camera"></i></span> */}
                                <span className={Style['profilepic__icon']}><img src={cameraIcon}/></span>
                                <span className={Style["profilepic__text"]}>Edit Profile</span>
                            </div>
                            </div>
                        ) : (
                            <div className={Style["profilepic"]} onClick={handleShowPhotoModal}>
                            <img className={Style['profilepic__image']} src={defaultPics} width="300px" height="300px" alt="Profibild" />
                            <div className={Style["profilepic__content"]}>
                                {/* <span class="profilepic__icon"><i class="fas fa-camera"></i></span> */}
                                <span className={Style['profilepic__icon']}><img src={cameraIcon}/></span>
                                <span className={Style["profilepic__text"]}>Edit Profile</span>
                            </div>
                            </div>
                        )}
                        <p className="mt-2"><strong>*Click on image to add profile photo.</strong></p>
                    </div>
                    <div className="col">
                        <div className="col border rounded border-dark p-3">
                            <p><strong>Username</strong></p>
                            <p>{data?.username}</p>
                            <p><strong>Email</strong></p>
                            <p>{data?.email}</p>
                            <p><strong>First Name</strong></p>
                            <p>{data?.first_name}</p>
                            <p><strong>Last Name</strong></p>
                            <p>{data?.last_name}</p>
                            <p><strong>Contact</strong></p>
                            <p>{data?.contact === '' ? data.contact : 'Contact not defined yet'}</p>
                            <hr></hr>
                            <div className="d-flex justify-content-center mt-3 mb-1">
                                <button type="button" className="btn btn-outline-primary" onClick={handleShow}>Update Profile</button>
                            </div>
                        </div>
                        <div className="mt-3 d-flex gap-3 flex-column">
                            <h3>Additional Settings</h3>

                            {/* Saran utk password jgn pakai modal lagi atau dibalik aja ini pakai modal tapi photo ndak usah */}

                            <button type="button" className="btn btn-outline-danger w-50">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}