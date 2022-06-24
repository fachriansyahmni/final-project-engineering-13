import React from "react";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

function Dashboard (){
    return ( 
        <div>
            <Navbar/>
                <div className="container">
                    <div class="row">
                        <div class="offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center">
                            <div class="row">
                                <div class="col-lg-12 col-sm-12 col-12 profile-header">
                                    <div class="row user-detail">
                                        <div class="col-lg-12 col-sm-12 col-12">
                                            <img src={"#"} class="rounded-circle img-thumbnail"/>
                                            <h4>Name</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div class="row justify-content-md-center text-center">
                        <div class="col-2">
                            <img src={"#"} width="160px" class="rounded float-start"/>
                            <h5>Tittle</h5>
                        </div>
                        <div class="col-2">
                            <img src={"#"} width="160px" class="rounded float-start"/>
                            <h5>Title</h5>
                        </div>
                        <div class="col-2">
                            <img src={"#"} width="160px" class="rounded float-start"/>
                            <h5>Title</h5>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>


      )
}

export default Dashboard;