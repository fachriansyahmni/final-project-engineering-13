import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

export default function ProfileModal (props) {
    const [email, setEmail] = useState('')
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = () => {
        try {
            // put to api
            props.handleSubmit()
        } catch (e) {
            console.log(e)
        }
    }
    
    console.log(props, 'data ke props modal')
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
                    // aria-describedby="passwordHelpBlock"
                    onChange={handleEmail}
                    value={props.data.email}
                />
                <Form.Label htmlFor="firstname">First Name</Form.Label>
                <Form.Control
                    type="text"
                    id="firstname"
                    // aria-describedby="passwordHelpBlock"
                />
                <Form.Label htmlFor="lastname">Last Name</Form.Label>
                <Form.Control
                    type="text"
                    id="lastname"
                    // aria-describedby="passwordHelpBlock"
                />
                <Form.Label htmlFor="phone">Phone Number</Form.Label>
                <Form.Control
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    aria-describedby="phoneHelpBlock"
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