import axios from "axios";
import React, { useEffect, useState } from "react";

import './styleList.scss'

export default function List ({query}) {
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            const response = await axios.get(`/api/v1/event?search=${query}`)
            console.log(response, 'hasil pencarian')
            setData(response.data.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getData()
    }, [query])
    return (
        <ul className="result-list">
            { data.length > 0 &&
                data.map((item, index) => (
                    <li key={index}>{item.id}</li>
            ))}
        </ul>
    )
}