import axios from "axios";
import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { dataStore } from "../store/data";

import { useNavigate } from "react-router-dom";

import swal from 'sweetalert'

export default function ProfileModal (props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [contact, setContact] = useState('');
    // setLastname('ini anu')
    // console.log(props.data, 'isi data')
    const {token} = dataStore()

    const data = {
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "contact": contact  
    }
   
  

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleFirstname = (event) => {
        setFirstname(event.target.value)
    }

    const handleLastname = (event) => {
        setLastname(event.target.value)
    }

    const handleContact = (event) => {
        setContact(event.target.value)
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.put('/api/v1/profile', data, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            // if (!response)
            console.log(response)
            swal("Profile berhasil diperbarui","anda berhasil memperbarui data profil", "success")
            .then((value) => {
                props.handleSubmit()
                props.handleClose()
            })
        } catch (e) {
            // console.log('jalan ke sini kah ')
            swal("Profile gagal diperbarui","Silahkan periksa koneksi atau format data yang dilampirkan" ,"error")
            console.log(e)
        }
    }
    
  
    return (
        <Modal
        show={props.show}
        onHide={props.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label htmlFor="inputemail">Email</Form.Label>
                <Form.Control
                    type="email"
                    id="inputemail"
                 
                    onChange={handleEmail}
                    value={email}
                />
                <Form.Label htmlFor="inputusername">Username</Form.Label>
                <Form.Control
                    type="text"
                    id="inputusername"
                
                    onChange={handleUsername}
                    value={username}
                />
                <Form.Label htmlFor="firstname">First Name</Form.Label>
                <Form.Control
                    type="text"
                    id="firstname"
                   
                    onChange={handleFirstname}
                   value={first_name}
                />
                <Form.Label htmlFor="lastname">Last Name</Form.Label>
                <Form.Control
                    type="text"
                    id="lastname"
                 
                    onChange={handleLastname}
                   value={last_name}
                />
                <Form.Label htmlFor="phone">Phone Number</Form.Label>
                <Form.Control
                    type="text" 
                    id="phone" 
                    name="phone" 
                    aria-describedby="phoneHelpBlock"
                    onChange={handleContact}
                    value={contact}
                />
                <Form.Text id="phoneHelpBlock" muted>
                    Contoh : 082136846231
                </Form.Text>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}