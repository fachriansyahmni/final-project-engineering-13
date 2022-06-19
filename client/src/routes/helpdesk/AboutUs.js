import React from "react";
import img from "../../assets/helpdesk/about-us.svg";

import be1 from "../../assets/helpdesk/fahri.jpg"
import fe1 from "../../assets/helpdesk/fahrezi.jpg"
import fe2 from "../../assets/helpdesk/umar.jpg"

export default function AboutUs () {
    return (
    <>
        {/* Overview start */}

        <div className="about-us d-flex flex-column flex-lg-row align-items-center">
            <div className="mx-auto">
                <img src={img} className="img-fluid" width="1000px" />
            </div>
            <div className="d-flex flex-column">
                <h1 className="text-center">Overview</h1>
                <p className="text-center">Ruang Event adalah sebuah platform untuk anda mempublikasikan event yang anda miliki supaya lebih dikenal masyarakat luas. Dirintis pada tahun 2022, Ruang Event mempermudah anda untuk mencari event yang anda minati.</p>
            </div>
        </div>

        {/* Overview end  */}

        {/* Team section start*/}

        <div className="d-flex flex-column mt-5">
            
            <p className="fs-2 fw-semibold d-block text-center" style={{color: 'rgb(77, 212, 172)'}}>Meet our awesome team member</p>
            {/* backend */}

            <p className="slideInRight fs-3 fw-bold d-block text-center mt-3" style={{color: '#5534A5'}}>Back-End Developer</p>            

            <div className="slideInLeft container d-flex flex-row justify-content-evenly mb-5">
                <div>
                    <img src={be1} className="img-fluid rounded-circle" width="200px"/>
                    <p className="text-center mt-3">Fachriansyah Muh Nur</p>
                </div>
                <div>
                    <img src={be1} className="img-fluid rounded-circle" width="200px"/>
                    <p className="text-center mt-3">Putra Prassiesa Abimanyu</p>
                </div>
                <div>
                    <img src={be1} className="img-fluid rounded-circle" width="200px"/>
                    <p className="text-center mt-3">Anril Pratama Drawira</p>
                </div>
            </div>
            {/* backend end*/}
            
            <p className="slideInRight fs-3 fw-bold d-block text-center" style={{color: '#4B7BE5'}}>Front-End Developer</p>

            {/* front end */}

            <div className="slideInLeft container d-flex flex-row justify-content-evenly">
                <div>
                    <img src={fe1} className="img-fluid rounded-circle" width="200px"/>
                    <p className="text-center mt-3">Muhammad Fahrezi</p>
                </div>
                <div>
                    <img src={fe2} className="img-fluid rounded-circle" width="200px"/>
                    <p className="text-center mt-3">M Ibnu Umar R</p>
                </div>
            </div>
            {/* front end*/}
        </div>
        {/* Team section end */}
    </>
    )
}