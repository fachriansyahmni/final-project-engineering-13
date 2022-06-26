import axios from "axios";
import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import seminarIcon from "../../assets/home/Seminar.svg"
import bookIcon from "../../assets/book.png"
import movieIcon from "../../assets/movie.png"
import healthIcon from "../../assets/health.png"
import noodles from "../../assets/noodles.png"
import star from "../../assets/star.png"
import searchIcon from "../../assets/searchicon.svg"

import dataDummy from "../../data/dummy";

import './style.scss'
import Card from "../../components/Card";
import List from "../../components/ListSearch";
import { Link } from "react-router-dom";

export default function Seminar () {

    const [seminar, setSeminar] = useState([])
    // const [cat, setCategory] = useState(0)

    // mungkin kasih tombol buat reset

    const loadSeminar = async () => {
        try {
            const response = await axios.get('/api/v1/event?model=1')
            // console.log(response.data.data, 'isi event seminar')
            setSeminar(response.data.data)
        } catch (e) {
            console.log(e)
        }
    }
    // console.log(seminar)

    const filter = (kategori, tipe, terbaru, price) => {
        // terbaru disini kalau default tampilkan yang terbaru (di reverse)
        // price juga kalau default diurutkan dari terendah ke tinggi
        // let filtered = [...dataDummy]
        let filtered = [...seminar]
        if (kategori === 'default' && tipe === 'default' && terbaru === 'default' && price === 'default') {
            // console.log('masuk return 1')
            return filtered.reverse()
        }
        // console.log('diluar ret 1')
        if (kategori !== 'default') {
            filtered = filtered.filter((item) => item.category_id === kategori)
        }
        if (tipe !== 'default') {
            filtered = filtered.filter((item) => item.type_event_id === tipe)
        }

        if (terbaru === 'terlama') {
            // console.log('terlama jalan')
            let rev = []
            for (let i = 0; i < filtered.length; i++) {
                rev.push(filtered[i])
            }
            
            // console.log(rev, 'rev')
            // filtered = rev.reverse()
            // console.log(filtered, 'inside terlama')
            filtered = [...rev]
            // console.log(filtered.reverse(), 'didalem terlama')
        }
        
        if (terbaru === 'default') {
            // console.log('terlama jalan')
            let rev = []
            for (let i = filtered.length - 1; i >= 0 ; i--) {
                rev.push(filtered[i])
            }
            
            // console.log(rev, 'rev')
            // filtered = rev.reverse()
            // console.log(filtered, 'inside terlama')
            filtered = [...rev]
        }

        // coming soon pengurutan berdasarkan price
        if (price === 'ascending') {
            // console.log('price ascending jalan')
            filtered = filtered.sort(function(a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
        }
        if (price === 'descending') {
            // console.log('price descending jalan')
            filtered = filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        return filtered
    }

    const [kategori, setKategori] = useState('default')
    const [terbaru, setTerbaru] = useState('default')
    const [tipe, setTipe] = useState('default')
    const [price, setPrice] = useState('default')

    // const n = filter(2,'default','default','descending')
    // console.log(n, 'ini dah difiler') // oke filter now work
    // console.log(terbaru)

    const filteredData = filter(kategori,tipe,terbaru,price);
    // console.log(filteredData,'data yg difilter')

    useEffect(() => {
        loadSeminar()
    }, [])

    const displayCategory = () => {
        if (kategori === 'default') {
            return (<h4 className="my-3">Menampilkan Kategori: Semua</h4>)
        } else if (kategori === 1) {
            return (<h4 className="my-3">Menampilkan Kategori: Pendidikan</h4>)
        } else if (kategori === 2) {
            return (<h4 className="my-3">Menampilkan Kategori: Hiburan</h4>)
        } else if (kategori === 3) {
            return (<h4 className="my-3">Menampilkan Kategori: Kesehatan</h4>)
        } else if (kategori === 4) {
            return (<h4 className="my-3">Menampilkan Kategori: Kuliner</h4>)
        }
    }

    const [query, setQuery] = useState('')

    const handleQuery = (e) => {
        setQuery(e.target.value)
    }
    // console.log(query,' isi query')

    const [searchData, setSearch] = useState([])

    const search = async () => {
            try {
                let q
                if (query.trim().length !== 0) {
                    q = query
                } else {
                    q = null
                }
                const response = await axios.get(`/api/v1/event?search=${q}`)
                // console.log(response, 'hasil pencarian')

                 setSearch(response.data?.data)
                 if (response.data.data === undefined) {
                    setSearch([])
                }
            } catch (e) {
                console.log(e)
            }
    }
    // console.log(searchData, 'hasil pencarian')

    const [catButton, setCatButton] = useState('all')

    let allBtn
    let eduBtn
    let entBtn
    let heaBtn
    let kulBtn

    if (catButton === 'all') {
        allBtn = 'cat-btn-active'
        eduBtn = 'cat-btn-inactive'
        entBtn = 'cat-btn-inactive'
        heaBtn = 'cat-btn-inactive'
        kulBtn = 'cat-btn-inactive'
    } else if (catButton === 'eduBtn') {
        allBtn = 'cat-btn-inactive'
        eduBtn = 'cat-btn-active'
        entBtn = 'cat-btn-inactive'
        heaBtn = 'cat-btn-inactive'
        kulBtn = 'cat-btn-inactive'
    } else if (catButton === 'entBtn') {
        allBtn = 'cat-btn-inactive'
        eduBtn = 'cat-btn-inactive'
        entBtn = 'cat-btn-active'
        heaBtn = 'cat-btn-inactive'
        kulBtn = 'cat-btn-inactive'
    } else if (catButton === 'heaBtn') {
        allBtn = 'cat-btn-inactive'
        eduBtn = 'cat-btn-inactive'
        entBtn = 'cat-btn-inactive'
        heaBtn = 'cat-btn-active'
        kulBtn = 'cat-btn-inactive'
    } else if (catButton === 'kulBtn') {
        allBtn = 'cat-btn-inactive'
        eduBtn = 'cat-btn-inactive'
        entBtn = 'cat-btn-inactive'
        heaBtn = 'cat-btn-inactive'
        kulBtn = 'cat-btn-active'
    }

    useEffect(() => {
        search()
    }, [query])

    const [placeHolderTerbaru, setplaceHolderTerbaru] = useState('Terbaru')
    const [placeHolderTipe, setplaceHolderTipe] = useState('Default')
    const [placeHolderHarga, setplaceHolderHarga] = useState('Default')

    // pagination logic start

    const [currentPage, setCurr] = useState(1)
    const [itemPerPages, setItemPerPages] = useState(8)
    
    const handlePageClicked = (e) => {
        setCurr(e.target.id)
    }
    const handlePrevBtn = () => {
        if (currentPage > 1){
            const curr = currentPage - 1
            setCurr(curr)
        } 
    }
    const handleNextBtn = () => {
        if (currentPage < pageNumber.length){
            const curr = currentPage + 1
            setCurr(curr)
        } 
    }
    console.log(currentPage, 'page saat ini')

    // displaying current item
    const indexLastItem = currentPage * itemPerPages
    const indexFirstItem = indexLastItem - itemPerPages
    const currentItem = filteredData.slice(indexFirstItem, indexLastItem)
    console.log(currentItem)

    const pageNumber = [];
    
    for (let i = 1; i <= Math.ceil(filteredData.length / itemPerPages); i++) {
        pageNumber.push(i);
    }

    // const renderPage = () => {
    //     for (let i = 0; i < pageNumber.length; i++) {
            
    //     }
    // }
    
    return (
        <div className="position-relative">
            <Navbar />
            <div className="container">
                <div className="row d-flex flex-row">
                    <div className="col-6">
                        <h1>Event Seminar</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                    <div className="col-6">
                        <img src={seminarIcon} width="400px" className="img-fluid rounded d-block mx-auto"/>
                    </div>
                </div>
            </div>
            <div className="bg-light position-relative">
                <div className="d-flex justify-content-center py-2 position-relative">
                    <div className="search-section position-relative" style={{width: "500px"}}>
                        <div className="d-flex flex-row gap-2 position-relative">
                            <input type="text" class="form-control" placeholder="Search Event" onChange={handleQuery} />
                            {/* <button className="btn btn-outline-success">Cari</button> */}
                            <img className="icon-search" src={searchIcon}/>
                        </div>
                        {/* <List query={query}/> */}
                        <div className="list-result container">
                            <div className="d-flex gap-2 p-2 flex-column">
                                {/* <div className="list-item-result py-1" onClick={() => {console.log('halo')}}>
                                    <span>Judul 1</span>
                                </div>
                                <div className="list-item-result">
                                    <span>Judul 2</span>
                                </div> */}
                                {
                                    searchData.length > 0 && 
                                        searchData.map((item, index) => (
                                            <Link to={`/event/seminar/${item.id}`} key={index}>
                                                <div className="list-item-result py-1 rounded" >
                                                    <span>{item.title}</span>
                                                </div>
                                            </Link>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h3 className="mb-5">Kategori</h3>
                <div className="d-flex justify-content-around">
                    
                    <div className={`${allBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori('default'); setCatButton('all')}}>
                        <div className={`d-flex flex-column`} >
                            <img src={star} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">All</p>
                        </div>
                    </div>

                    <div className={`${eduBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori(1); setCatButton('eduBtn')}}>
                        <div className={`d-flex flex-column`}>
                            <img src={bookIcon} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">Pendidikan</p>
                        </div>
                    </div>
                    <div className={`${entBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori(2); setCatButton('entBtn')}}>
                        <div className={`d-flex flex-column`}>
                            <img src={movieIcon} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">Hiburan</p>
                        </div>
                    </div>
                    <div className={`${heaBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori(3); setCatButton('heaBtn')}}>
                        <div className={`d-flex flex-column`}>
                            <img src={healthIcon} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">Kesehatan</p>
                        </div>
                    </div>
                    <div className={`${kulBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori(4); setCatButton('kulBtn')}}>
                        <div className={`d-flex flex-column`}>
                            <img src={noodles} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">Kuliner</p>
                        </div>
                    </div>
                </div>
                {displayCategory()}
                <div className="d-flex flex-column mb-3">
                    <div>
                        <h3>Sort</h3>
                        <button className="btn btn-outline-success" onClick={() => {setTerbaru('default'); setTipe('default'); setPrice('default')}}>Reset</button>
                    </div>
                    <div className="d-flex gap-5">

                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-center">Tanggal Ditambahkan</h6>
                            <div class="dropdown">
                                <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {placeHolderTerbaru}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={() => {setTerbaru('default'); setplaceHolderTerbaru('Terbaru')}}>Terbaru</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setTerbaru('terlama'); setplaceHolderTerbaru('terlama')}}>Terlama</button></li>
                                </ul>
                            </div>
                        </div>

                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-center">Tipe Seminar</h6>
                            <div class="dropdown">
                                <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {placeHolderTipe}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={() => {setTipe('default'); setplaceHolderTipe('Default')}}>Default</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setTipe(1); setplaceHolderTipe('Online')}}>Online</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setTipe(2); setplaceHolderTipe('Offline')}}>Offline</button></li>
                                </ul>
                            </div>
                        </div>

                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-center">Harga</h6>
                            <div class="dropdown">
                                <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {placeHolderHarga}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={() => {setPrice('default'); setplaceHolderHarga('Default')}}>Default</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setPrice('ascending'); setplaceHolderHarga('Harga terendah')}}>Harga terendah</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setPrice('descending'); setplaceHolderHarga('Harga tertinggi')}}>Harga tertinggi</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-3">
                    {/* {
                        filteredData.length > 0 && 
                            filteredData.map((item, index) => (
                                <Card banner={item.banner_img} id={item.id} price={item.price} title={item.title} key={index}/>
                            ))
                    } */}
                    {
                        currentItem.length > 0 && 
                            currentItem.map((item, index) => (
                                <Card banner={item.banner_img} id={item.id} price={item.price} title={item.title} key={index}/>
                            ))
                    }
                    {/* <Card banner={'https://eventkampus.com/data/event/poster/21/_thumbnail/600x600/4253-virtual-job-fair-jogja-2022.jpeg'} id={1} price={0} title={"Event 1"} />
                    
                    <Card banner={'https://eventkampus.com/data/event/poster/21/_thumbnail/600x600/4253-virtual-job-fair-jogja-2022.jpeg'} id={2} price={1000} title={"Event 2"} />
                  
                   
                    <Card banner={'https://eventkampus.com/data/event/poster/21/_thumbnail/600x600/4253-virtual-job-fair-jogja-2022.jpeg'} id={1} price={0} title={"Event 1"} />
                    
                    
                    <Card banner={'https://eventkampus.com/data/event/poster/21/_thumbnail/600x600/4253-virtual-job-fair-jogja-2022.jpeg'} id={2} price={1000} title={"Event 2"} />
                   
                    
                    <Card banner={'https://eventkampus.com/data/event/poster/21/_thumbnail/600x600/4253-virtual-job-fair-jogja-2022.jpeg'} id={1} price={0} title={"Event 1"} />
                    
                    <Card banner={'https://eventkampus.com/data/event/poster/21/_thumbnail/600x600/4253-virtual-job-fair-jogja-2022.jpeg'} id={2} price={1000} title={"Event 2"} />
                    
                    <Card banner={'https://eventkampus.com/data/event/poster/21/_thumbnail/600x600/4253-virtual-job-fair-jogja-2022.jpeg'} id={1} price={0} title={"Event 1"} />
                   
                    <Card banner={'https://eventkampus.com/data/event/poster/21/_thumbnail/600x600/4253-virtual-job-fair-jogja-2022.jpeg'} id={2} price={1000} title={"Event 2"} />
                     */}
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <ul class="pagination d-flex gap-2 ">
                        <li class="page-item btn-prev page-link border border-dark rounded" onClick={handlePrevBtn}>Previous</li>
                        {/* <li class="page-item btn-prev page-link" id={1} onClick={handlePageClicked}>1</li>
                        <li class="page-item btn-prev page-link" id={2} onClick={handlePageClicked}>2</li>
                        <li class="page-item btn-prev page-link" id={3} onClick={handlePageClicked}>3</li> */}
                        {/* {
                            pageNumber.map((number, idx) => (
                                <li class="pgn-active page-item btn-prev page-link border border-dark rounded" id={number} onClick={handlePageClicked} key={idx}>{number}</li>
                            ))
                        }
                         */}
                        {
                            pageNumber.map((number, idx) => {
                                console.log(number, currentPage)
                               if (number === parseInt(currentPage)) {
                                return (<li class="pgn-active page-item btn-prev page-link border border-dark rounded" id={number} onClick={handlePageClicked} key={idx}>{number}</li>)
                               } 
                               return (<li class="page-item btn-prev page-link border border-dark rounded" id={number} onClick={handlePageClicked} key={idx}>{number}</li>
                            )})
                        }
                        <li class="page-item btn-prev page-link border border-dark rounded" onClick={handleNextBtn}>Next</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}