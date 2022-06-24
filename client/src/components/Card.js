import React from "react";

import { Link } from "react-router-dom";

import './Card.scss'

export default function Card ({banner, id, price, title}) {
    let free = (price === 0 ? 'free' : 'falseDisplay')
    return (
        <Link to={`/event/seminar/${id}`}>
            <div className="card d-inline-block position-relative">
                <p className={free}>Free</p>
                <div className="">
                    <img src={banner} />
                </div>
                <div className="titleEvent px-1">
                    {title}
                    {/* The 56th MarkPlus Goes to Campus “Entrepreneurial Marketing" */}
                </div>
            </div>
        </Link>
    )
}