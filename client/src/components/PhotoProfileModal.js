import axios from "axios";
import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { dataStore } from "../store/data";

export default function PhotoProfileModal (props) {

    const {token} = dataStore()

    const [link, setLink] = useState(null)
   
    const handleLink = (event) => {
        setLink(event.target.value)
        console.log(link)
    }

    const handleSubmit = async (event) => {
        try {
        
            event.preventDefault()
            const response = await axios.put('/api/v1/photo', {
                'photo': link
            }, { 
                headers: {
                    'Authorization': `${token}` 
                }
            })
           
            props.handleSubmit()
            props.handleClose()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal
        show={props.show}
        onHide={props.handleClose}
        size="lg"
        aria-labelledby="profileModal"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="profileModal">
                    Add Photo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label htmlFor="inputLink">Link Photo</Form.Label>
                <Form.Control
                    type="text"
                    id="inputLink"
                    onChange={handleLink}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}