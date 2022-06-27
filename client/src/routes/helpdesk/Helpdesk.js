import React, { useState } from "react";
import faqIcon from "../../assets/helpdesk/faq_icon.svg"
import aboutIcon from "../../assets/helpdesk/people.svg"
import Faq from "./Faq";
import AboutUs from "./AboutUs";
import "./style.scss"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function Helpdesk () {
    const [window, setWindow] = useState('aboutUs')
    let view
    let faq
    let aboutUs
    if (window === 'faq') {
        view = <Faq />
        faq = 'tab-active';
        aboutUs = 'false';
    }
    if (window === 'aboutUs') {
        view = <AboutUs />
        faq = 'false';
        aboutUs = 'tab-active';
    }
    return (
        <>  
            <Navbar />
            <div className="d-flex py-4" style={{backgroundColor: "#4DD4AC"}}>

            </div>
            
            <div className="container-fluid" style={{marginTop: "-2rem", marginBottom: "1rem"}}>
                <div className="container">
                    <div className="tabs-icon d-flex justify-content-center gap-5">
                        <div style={{backgroundColor: "#fff"}} className={`rounded ${faq}`} onClick={() => {setWindow('faq')}}>
                            <div className="wrapper-image">
                                <img src={faqIcon}/>
                            </div>
                            <div className="title text-center">
                                FAQ
                            </div>
                        </div>
                        <div style={{backgroundColor: "#fff"}} className={`rounded ${aboutUs}`} onClick={() => {setWindow('aboutUs')}}>
                            <div className="wrapper-image">
                                <img src={aboutIcon} width="100"/>
                            </div>
                            <div className="title text-center">
                                About Us
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {view}
            <Footer />
        </>
    )
}