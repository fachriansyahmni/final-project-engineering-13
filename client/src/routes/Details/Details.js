import React, { useState } from "react";
import ReactMarkdown from 'react-markdown'

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import dataStore from "../../store/data";
import bookmarkIcon from "../../assets/details/Bookmark.svg"
import clockIcon from "../../assets/details/Clock.svg"
import locationIcon from "../../assets/details/Location.svg"
import timelineIcon from "../../assets/details/Timeline.svg"
import testIcon from "../../assets/details/test.svg"


function Details (){
    return (
        <div>
            <Navbar />
                
            <div class="container mb-3" >
                <div class="row g-0">
                    <div class="col-md-2 ">
                        <img src={testIcon} width="150px" class="img-fluid rounded-start"/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                                <div class="d-flex justify-content-start ">
                                    <img src={bookmarkIcon} width="30px" class="img-fluid rounded-start" alt="..."/>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                </div>
                                <div class="d-flex justify-content-start ">
                                    <img src={timelineIcon} width="30px" class="img-fluid rounded-start" alt="..."/>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                </div>
                                <div class="d-flex justify-content-start ">
                                    <img src={clockIcon} width="30px" class="img-fluid rounded-start" alt="..."/>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                </div>
                                <div class="d-flex justify-content-start ">
                                    <img src={locationIcon} width="30px" class="img-fluid rounded-start" alt="..."/>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container"> 
                INI DESKRIPSI
            </div>

        <div className="container">  
            <h4>Recommended</h4>
            <div class="row justify-content-center gap-5">
                <div class="row col-md-2 ">
                    <div class="card text-white ">
                            <img src={testIcon} class="card-img" alt="..."/>
                        <div class="card-img-overlay">
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute bottom-0 start-0">Card title</h5>
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute top-0 start-0">Free</h5>
                        </div>
                    </div>
                </div>
                <div class="row col-md-2 ">
                    <div class="card text-white">
                            <img src={testIcon} class="card-img" alt="..."/>
                        <div class="card-img-overlay">
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute bottom-0 start-0">Card title</h5>
                            {/* <h5 class="card-title bg-dark text-white opacity-75 position-absolute top-0 start-0">Free</h5> */}
                        </div>
                    </div>
                </div>
                <div class="row col-md-2 ">
                    <div class="card text-white">
                            <img src={testIcon} class="card-img" alt="..."/>
                        <div class="card-img-overlay">
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute bottom-0 start-0">Card title</h5>
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute top-0 start-0">Free</h5>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div class="row justify-content-center gap-5">
                <div class="row col-md-2 ">
                    <div class="card text-white ">
                            <img src={testIcon} class="card-img" alt="..."/>
                        <div class="card-img-overlay">
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute bottom-0 start-0">Card title</h5>
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute top-0 start-0">Free</h5>
                        </div>
                    </div>
                </div>
                <div class="row col-md-2 ">
                    <div class="card text-white">
                            <img src={testIcon} class="card-img" alt="..."/>
                        <div class="card-img-overlay">
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute bottom-0 start-0">Card title</h5>
                            {/* <h5 class="card-title bg-dark text-white opacity-75 position-absolute top-0 start-0">Free</h5> */}
                        </div>
                    </div>
                </div>
                <div class="row col-md-2 ">
                    <div class="card text-white">
                            <img src={testIcon} class="card-img" alt="..."/>
                        <div class="card-img-overlay">
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute bottom-0 start-0">Card title</h5>
                            <h5 class="card-title bg-dark text-white opacity-75 position-absolute top-0 start-0">Free</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>



            <Footer />
        </div>
    )
}

export default Details;