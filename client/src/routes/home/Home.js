import React from "react";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {dataStore} from "../../store/data";
import homeIcon from "../../assets/home/Home.svg"
import seminarIcon from "../../assets/home/Seminar.svg"
import beasiswaIcon from "../../assets/home/Beasiswa.svg"
import PublisherIcon from "../../assets/home/Publisher.svg"
import ManagementsIcon from "../../assets/home/Managements.svg"
import PlatformIcon from "../../assets/home/Platform.svg"

export default function Home () {
    const {token} = dataStore()
    console.log(token,'ini dari home')
    return (
        <>
            <Navbar />
            {/* Event Start */}
            <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-5" >
                            <div className=" ps-5">
                                <h5 className=" fst-italic text-primary fs-1" style={{letterSpacing:'0.205em'}}>Make Your</h5>
                                <h5 className=" fst-italic text-primary fs-1" style={{letterSpacing:'0.205em'}}>Events</h5>
                                <p className="">Mengadakan acara luar biasa, bagikan pengetahuan, bangun dan kembangkan komunitas Anda, ciptakan peluang</p>
                                <button type="button" className="btn btn-outline-success ">Create Event</button>
                            </div>
                        </div>
                        <div className="col-5 text-center" >
                            <img src={homeIcon} width='250px' className="img-fluid rounded-start" alt="Events"/>
                            
                        </div>
                    </div>
                
            </div>    
            {/* Event End */}
            
            {/* Seminar Start */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5 text-center"  >
                            <img src={seminarIcon} width='400px' className="img-fluid rounded-start" alt="Seminar"/>
                    </div>
                    <div className="col-5">
                        <div style={{paddingLeft:'100px'}}>
                            <h5 className=" fst-italic fs-1 pt-4" style={{letterSpacing:'0.1em'}}>Seminar</h5>
                            <p className="">Menyediakan event seminar yang kamu butuhkan dari berbagai komunitas</p>
                            <button type="button" className="btn btn-outline-success ">Click Here</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Seminar End */}

            {/* Beasiswa Start */}
            <div className="container">
                <div className="row justify-content-center">
                        <div className="col-5">
                            <div className=" ps-5 pt-5">
                                <h5 className=" fst-italic fs-1" style={{letterSpacing:'0.1em'}}>Beasiswa</h5>
                                <p>Mencari informasi dan mengenal berbagai program beasiswa</p>
                                <button type="button" className="btn btn-outline-success ">Click Here</button>
                            </div>
                        </div>
                        <div className="col-5 text-center">
                            <img src={beasiswaIcon} width='350px' className="img-fluid rounded-start" alt="Beasiswa"/>
                            
                        </div>
                    </div>
                
            </div> 
            {/* Beasiswa End */}

            {/* Offer Start */}
            <h1 className="text-center">What we Offer</h1>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-3 text-center">
                        <img src={PublisherIcon} width='200px' className="img-fluid rounded-start" alt="Publisher"/>
                        <h2>Event Publisher</h2>
                        <p>Ruang event adalah platform untuk publikasi event yang dapat menjangkau audiens lebih luas</p>
                    </div>
                    <div className="col-3 text-center">
                        <img src={ManagementsIcon} width='200px' className="img-fluid rounded-start" alt="Managements"/>
                        <h2>Event Managements</h2>
                        <p>Kelola event yang kamu publish dengan mudah dan nyaman</p>
                    </div>
                    <div className="col-3 text-center">
                        <img src={PlatformIcon} width='200px' className="img-fluid rounded-start" alt="Platform"/>
                        <h2>Event Platform</h2>
                        <p>Akses dari berbagai device kesayangan kamu, baik desktop, smartphone dan yang lainnya</p>
                    </div>
                </div>
            </div>
            {/* Offer End */}

            <Footer />
        </>
    )
}