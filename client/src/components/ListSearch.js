import axios from "axios";
import React, { useEffect, useState } from "react";

import './styleList.scss'

export default function List ({query}) {


    const [data, setData] = useState([])
    console.log(query, 'isiqurer')
    const getData = async () => {
        if (query !== '') {
            try {
                const response = await axios.get(`/api/v1/event?search=${query}`)
                console.log(response, 'hasil pencarian')
                setData(response.data.data)
            } catch (e) {
                console.log(e)
            }
        }
    }
    useEffect(() => {
        getData()
    }, [query])

    return (
        <ul className="result-list container" style={{backgroundColor: "#454"}}>
            { data.length > 0 &&
                data.map((item, index) => (
                    <li key={index}>{item.id}</li>
            ))}
        </ul>
    )
}