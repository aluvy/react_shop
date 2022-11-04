import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import axios from "axios";
import * as common from "./script.js";
import './App.css';
import data from './data.js';
import Detail from './router/Detail.js';
import { About, AboutShopping, AboutDelivering } from './router/About.js';

function App() {

    let [prd, setPrd] = useState(data);
    let [req, setReq] = useState(2);

    return (
        <div className="App">
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container fluid>
                    <Navbar.Brand><h1><Link to="/" onClick={common.scrollTop}>React</Link></h1></Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" onClick={common.scrollTop}>Home</Link>
                        <Link to="/about/shopping" onClick={common.scrollTop}>About</Link>
                    </Nav>
                    <Nav>
                        <Link to="/cart">🛒</Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Index prd={prd} setPrd={setPrd} req={req} setReq={setReq} />} />
                <Route path="/detail/:prdId" element={<Detail prd={prd} />} />

                <Route path="/about" element={<About />}>
                    <Route path="shopping" element={<AboutShopping />} />
                    <Route path="delivering" element={<AboutDelivering />} />
                </Route>

                <Route path="*" element={<div style={{padding:"2rem"}}>There's nothing here!</div>} />
            </Routes>

            <footer>
                <p>&copy; React App</p>
            </footer>
        </div>
    );
}


function Index({prd, setPrd, req, setReq}){
    
    let [ing, setIng] = useState(false);

    return(
        <article id="index">
            <div className="main_visual">
                <img src={process.env.PUBLIC_URL + '/img/main_visual2.jpg'} alt="main visual" />
            </div>

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

export default App;