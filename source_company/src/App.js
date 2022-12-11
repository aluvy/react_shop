import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col, Button, Spinner, Alert, Offcanvas } from 'react-bootstrap';
import axios from "axios";
// import { useQuery } from "react-query";
import { useQuery } from '@tanstack/react-query' 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import * as common from "./script.js";
import data from './data.js';
import './App.css';

import ScrollTop from './component/ScrollTop.js';

import { About, AboutShopping, AboutDelivering } from './router/About.js';
// import Detail from './router/Detail.js'
// import Cart from './router/Cart.js'
// const { About, AboutShopping, AboutDelivering } = lazy(() => import('./router/About.js'));
const Detail = lazy(() => import('./router/Detail.js'));
const Cart = lazy(()=> import('./router/Cart.js'));

function App() {

    let [prd, setPrd] = useState(data);
    let [req, setReq] = useState(2);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let latest = JSON.parse(localStorage.getItem("latest")) ?? false;

    useEffect(()=>{
        if(latest === false) { localStorage.setItem("latest", JSON.stringify( [] )) }
    },[]);

    
    let result = useQuery(['작명'], ()=>{
        return axios.get('https://codingapple1.github.io/userdata.json')
        .then((res)=>{
            // console.log(res.data)
            return res.data;
        })
    }, { staleTime : 2000 })

    return (
        <div className="App">

            <Navbar bg="dark" variant="dark" fixed="top" className="gnb">
                <Container fluid>
                    <Navbar.Brand><h1><Link to="/" onClick={common.scrollTop}>React</Link></h1></Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <Link to="/" onClick={common.scrollTop}>Home</Link> */}
                        <Link to="/about/shopping" onClick={common.scrollTop}>About</Link>
                    </Nav>
                    <Nav>
                        <Link onClick={handleShow}>history</Link>
                        <Link className="greeing">
                            { result.isLoading && 'loading' }
                            { result.error && 'error' }
                            { result.data && result.data.name }
                        </Link>
                        <Link to="/cart">🛒</Link>
                    </Nav>
                </Container>
            </Navbar>

            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Index prd={prd} setPrd={setPrd} req={req} setReq={setReq} />} />
                    <Route path="/detail/:prdId" element={<Detail prd={prd} />}/>

                    <Route path="/about" element={<About />}>
                        <Route path="shopping" element={<AboutShopping />} />
                        <Route path="delivering" element={<AboutDelivering />} />
                    </Route>

                    <Route path="/cart" element={<Cart />} />

                    <Route path="*" element={<div style={{padding:"2rem"}}>There's nothing here!</div>} />
                </Routes>
            </Suspense>

            <footer>
                <p>&copy; React App</p>
            </footer>
            
            
            <ViewHistory show={show} handleClose={handleClose} handleShow={handleShow} latest={latest} />
            <ScrollTop />
        </div>
    );
}


function Index({prd, setPrd, req, setReq}){
    
    let [ing, setIng] = useState(false);

    return(
        <article id="index">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper main_visual"
            >
                {
                    [1, 2, 3, 4, 5].map((a, i)=>{
                        return(
                            <SwiperSlide key={i}>
                                <img src={process.env.PUBLIC_URL + `/img/main_visual${a}.jpg`} alt="main visual" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

            <Container fluid className="prd_list">
                <div className="prd_sort">
                    <Button variant="outline-primary" size="sm" onClick={()=>{
                        let copy = [...prd].sort((a, b)=> {
                            if (a.title > b.title) return 1;
                            if (a.title < b.title) return -1;
                            return 0;
                        });
                        setPrd(copy);
                    }}>가나다순 정렬</Button>
                </div>
                <Row>
                    {
                        prd.map((a, i)=>{ return(
                            <Product prd={prd[i]} key={i} />
                        )})
                    }
                </Row>

                <div className="prd_loading">
                    {
                        ing === true
                        ?
                        <div className="prd_loading_inner">
                            <Spinner animation="grow" variant="primary" size="sm" />
                            <Spinner animation="grow" variant="primary" size="sm" />
                            <Spinner animation="grow" variant="primary" size="sm" />
                        </div>
                        :
                        null
                    }
                </div>
                <div className="prd_more">
                    <Row><Col>
                        {
                            req < 4
                            ?
                            <Button variant="outline-primary" onClick={()=>{
                                if( !(req < 4) ){
                                    return false;
                                }

                                setIng(true);
                                axios.get(`https://aluvy.github.io/react_shop/data${req}.json`)
                                .then((response)=>{
                                    let copy = [...prd, ...response.data];
                                    setPrd(copy);
                                })
                                .catch((error)=>{ console.log(error) })
                                .finally(()=>{ setReq(req = req+1); setIng(false) });
                            }}>view more</Button>
                            :
                            <Alert variant="light">리스트가 없습니다.</Alert>
                        }
                    </Col></Row>
                </div>
            </Container>
        </article>
    );
}

function Product({prd, i}){
    return(
        <Col xs={6} sm={4} md={4} lg={2} className="prd_item">
            <Link to={`/detail/${prd.id}`} onClick={common.scrollTop}>
                <img src={process.env.PUBLIC_URL + `/img/product${ prd.id }.jpg`} alt="product" />
                <div className="prd_info">
                    <span>{ prd.content }</span>
                    <p>{ prd.title }</p>
                    <strong>{ common.format_money(prd.price) }</strong>
                </div>
            </Link>
        </Col>
    );
}

function ViewHistory({ show, handleClose, latest, latestShow }){
    
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" backdrop="true">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>a recent product</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    latest !== false
                    ?
                    latest.map((item, i)=>{return (
                        <Link to={`/detail/${item.id}`}
                        className="latest_item"
                        key={i}
                        onClick={ ()=>{
                            common.scrollTop()
                            handleClose();
                        }}>
                            <Row>
                                <Col xs={4}>
                                    <img src={process.env.PUBLIC_URL + `/img/product${item.id}.jpg`} alt="product" />
                                </Col>
                                <Col xs={8} className="latest_item_info">
                                    <span>{ item.content }</span>
                                    <p>{ item.title }</p>
                                    <strong>{ common.format_money(item.price) }</strong>
                                </Col>
                            </Row>
                        </Link>
                    )})
                    :
                    <Alert variant="light" style={{textAlign:"center", fontSize:".75rem", color:"#999"}}>최근 본 상품 리스트가 없습니다.</Alert>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default App;