import React from "react";

import ig from "../assets/footer/instagram.svg"
import fb from "../assets/footer/facebook.svg"
import ln from "../assets/footer/linkedin.svg"
import yt from "../assets/footer/youtube.svg"



// import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import bootstrap from 'bootstrap'

export default function Main () {
    return (
        <>              
            {/* Footer start */}
            <div class="card text-center mt-5 pt-4" style={{backgroundColor: '#343A40'}}>
                {/* <div class="card-header">
                    Featured
                </div> */}
                <div className="container p-0">
                    <div class="card-body d-flex flex-column flex-start flex-lg-row justify-content-lg-between">
                        {/* <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        <div style={{color: '#fff'}} className="text-start fs-2">
                            Ruang Event
                        </div>
                        <div className="d-flex flex-row gap-5 mt-3 mt-lg-0 py-4">
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
                <div class="card-footer text-muted" style={{backgroundColor: '#4DD4AC'}}>
                        Copyright © 2022-PRESENT, Ruang Event Teams
                </div>
            </div>

            {/* Footer end  */}
        </>
    )
}
