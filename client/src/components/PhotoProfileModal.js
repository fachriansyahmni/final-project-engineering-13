import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

export default function PhotoProfileModal (props) {

    const [link, setLink] = useState(null)
    console.log('dari photo')
    const handleLink = (event) => {
        setLink(event.target.value)
        console.log(link)
    }

    const handleSubmit = () => {
        try {
            // api goes here
            props.handleSubmit()
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