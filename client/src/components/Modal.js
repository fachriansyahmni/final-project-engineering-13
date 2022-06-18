import React from "react";

import { Modal, Button } from "react-bootstrap";

export default function MyModal (props) {
    return (
        <Modal 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Username atau password tidak cocok
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                Username atau password yang anda masukkan tidak cocok, jika anda belum memiliki akun silahkan registrasi.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}