import React from "react";
import img from "../../assets/helpdesk/about-us.svg";
export default function AboutUs () {
    return (
        <div className="about-us d-flex flex-column flex-lg-row align-items-center">
            <div className="mx-auto">
                <img src={img} className="img-fluid" width="1000px" />
            </div>
            <div className="d-flex flex-column">
                <h1 className="text-center">Overview</h1>
                <p className="text-center">Ruang Event adalah sebuah platform untuk anda mempublikasikan event yang anda miliki supaya lebih dikenal masyarakat luas. Dirintis pada tahun 2022, Ruang Event mempermudah anda untuk mencari event yang anda minati.</p>
            </div>
        </div>
    )
}