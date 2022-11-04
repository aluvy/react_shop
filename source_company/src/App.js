import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col, Button, Spinner, Alert, Offcanvas } from 'react-bootstrap';
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import * as common from "./script.js";
import data from './data.js';
import './App.css';

import Detail from './router/Detail.js';
import { About, AboutShopping, AboutDelivering } from './router/About.js';
import Cart from './router/Cart.js';

function App() {

    let [prd, setPrd] = useState(data);
    let [req, setReq] = useState(2);
    let [scroll, setScroll] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handelScroll(){
        if(window.scrollY >= 100){  setScroll('on');
        } else {                    setScroll('');
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', handelScroll);
        return ()=>{
            window.removeEventListener('scroll', handelScroll);
        }
    }, []);

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
                        <Link to="/cart">🛒</Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* const [show, setShow] = useState(false);

            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true); */}

            <ViewHistory show={show} handleClose={handleClose} handleShow={handleShow} />
            



            <Routes>
                <Route path="/" element={<Index prd={prd} setPrd={setPrd} req={req} setReq={setReq} />} />
                <Route path="/detail/:prdId" element={<Detail prd={prd} />} />

                <Route path="/about" element={<About />}>
                    <Route path="shopping" element={<AboutShopping />} />
                    <Route path="delivering" element={<AboutDelivering />} />
                </Route>

                <Route path="/cart" element={<Cart />} />

                <Route path="*" element={<div style={{padding:"2rem"}}>There's nothing here!</div>} />
            </Routes>

            <footer>
                <p>&copy; React App</p>
            </footer>
            
            
            <div className={`btn__scrolltop ${scroll}`}>
                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="KeyboardArrowUpIcon" fill="#fff">
                    <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                </svg>
            </div>
             

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

function ViewHistory({show, handleClose, handleShow}){

    let [latest] = useState(localStorage.getItem("latest"));
    let [latestShow] = useState(false);

    

    if( latest !== null ){
        
    }
    // let [latest, setLatest] = useState(localStorage.getItem("latest"));
    

    function handelLatest(){

        console.log('latest 1', latest)
        // let setLatest(localStorage.getItem("latest"));
        // console.log(latest)

        // if( latest !== null || latest !== undefined ){
        //     console.log('있')
        //     // setLatest( JSON.parse(localStorage.getItem("latest")) );
        //     setLatestShow(true);
        // } else {
        //     setLatestShow(false);
        // }
    }

    useEffect(()=>{


        handelLatest();
        // console.log('latest 2', latest)

        return ()=>{

            // handelLatest();

        }
    }, [show, handleClose, handleShow, latestShow, latest])
    
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" backdrop="static">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>a recent product</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    latestShow === true
                    ?
                    latest.map((item, i)=>{return(
                        <Link to={`/detail/${item.id}`}
                        key={i}
                        onClick={ ()=>{
                            common.scrollTop()
                            handleClose();
                        }}>
                            <Row className="latest_item">
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