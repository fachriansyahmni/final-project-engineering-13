import React from "react";

import ig from "../assets/footer/instagram.svg"
import fb from "../assets/footer/facebook.svg"
import ln from "../assets/footer/linkedin.svg"
import yt from "../assets/footer/youtube.svg"



// import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
// import bootstrap from 'bootstrap'

export default function Main () {
    return (
        <>              
            {/* Footer start */}
            <div class="card mt-5 pt-4" style={{backgroundColor: '#343A40'}}>
                <div class="card-header d-flex justify-content-between text-light" style={{backgroundColor:'transparent'}}>
                    <div className="text-start fs-2 ps-5">
                        Ruang Event
                    </div>
                    <div className="text-end pt-3" style={{paddingRight: '165px'}}>
                        Hubungi Kami
                    </div>
                </div>

                <div className="container p-0">
                    <div class="card-body d-flex flex-column flex-start flex-row-reverse justify-content-lg-between">
                        <div className="d-flex flex-row-reverse gap-5 mt-3 mt-lg-0 py-4">
                            <div style={{backgroundColor: '#4DD4AC'}} className="d-flex align-items-center p-1 rounded">   
                                <img src={ig} width="20px" className="img-fluid"/>
                            </div>
                            <div style={{backgroundColor: '#4DD4AC'}} className="d-flex align-items-center p-1 rounded">   
                                <img src={fb} width="20px" className="img-fluid"/>
                            </div>
                            <div style={{backgroundColor: '#4DD4AC'}} className="d-flex align-items-center p-1 rounded">   
                                <img src={ln} width="20px" className="img-fluid"/>
                            </div>  
                            <div style={{backgroundColor: '#4DD4AC'}} className="d-flex align-items-center p-1 rounded">   
                                <img src={yt} width="20px" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-footer d-flex justify-content-evenly" style={{backgroundColor: '#4DD4AC'}}>
                    <div className="text-muted">
                        Copyright © 2022-PRESENT, Ruang Event Teams
                    </div>
                    <div >
                        Kebijakan Privasi | Syarat dan Ketentuan
                    </div>
                </div>
            </div>
            {/* Footer end  */}
        </>
    )
}
