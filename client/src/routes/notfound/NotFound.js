import React from "react"

import pics from "./notfound.jpg"

import { useNavigate } from "react-router-dom"

export default function NotFound () {
    const navigate = useNavigate()
    return (
        <div className="container">
            <img src={pics} className="d-block mx-auto" style={{width: "700px"}} />
            <div className="d-flex justify-content-center">
                <button className="btn btn-outline-success" onClick={() => navigate('/')}>Back to homepage</button>
            </div>
        </div>
    )
}