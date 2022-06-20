import React from "react";

import { Modal, Button } from "react-bootstrap";

export default function ProfileModal (props) {
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
                    <p>Modal body</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button >Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}