import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import './App.css';
import data from './data.js';

import Detail from './routes/Detail.js';
import About from './routes/About.js';
import Experience from './routes/Experience.js';
import Delivering from './routes/Delivering.js';
import axios from 'axios';

function App() {
    let [prd, setPrd] = useState(data);
    
    let navigate = useNavigate();

    return (
        <div className="App">

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="logo" onClick={()=>{ navigate("/") }}>ReactShop</Navbar.Brand>
                    <Nav className="me-auto nav_wrap">
                        <Nav.Link onClick={()=>{ navigate("/") }}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate("/about") }}>About</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate("/event") }}>Event</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Main prd={prd} setPrd={setPrd} />} />
                <Route path="/detail/:id" element={<Detail prd={prd} />} />
                
                <Route path="/about" element={<About />}>
                    <Route path="experience" element={ <Experience /> } />
                    <Route path="delivering" element={ <Delivering /> } />
                </Route>

                <Route path="/event" element={<Event />} />

                <Route path="*" element={<div>없는페이지요</div>} />
            </Routes>
            
            <footer>&copy; ReactShop</footer>

        </div>
    );
}

function Product(props){
    return (
        <Col xs={6} md={4} lg={4} xl={2} className="prd_item">
            <Link to={`/detail/${props.prd.id}`}>
                <img src={process.env.PUBLIC_URL + `/img/product${props.prd.id}.jpg`} alt="상품 이미지1" />
                <p>{props.prd.content}</p>
                <h3>{props.prd.title}</h3>
                <span>{props.prd.price}</span>
            </Link>
        </Col>
    );
}

function Main(props){
    let [url, setURL] = useState(2);
    let [load, setLoad] = useState(false);

    return (
        <div>
            <div className="visual">
                <img src={process.env.PUBLIC_URL + '/img/main_visual1.jpg'} alt="main_visual" />
            </div>

            <Container fluid className="prd_wrap">
                <div className="prd_sort">
                    <Button onClick={()=>{
                        let copy = [...props.prd];
                        copy.sort((a,b)=>{
                            return -1;
                        });
                        props.setPrd(copy);
                    }} variant="outline-primary" size="sm">가나다순 정렬</Button>

                </div>
                <Row>
                    {
                        props.prd.map((a, i)=>{return(
                            <Product key={i} prd={props.prd[i]} i={i} />
                        )})
                    }
                </Row>
                
                <div className="loading">
                {
                    load === true
                    ? <div className="loading_inner">
                        <Spinner animation="grow" variant="primary" size="sm" />
                        <Spinner animation="grow" variant="primary" size="sm" />
                        <Spinner animation="grow" variant="primary" size="sm" />
                    </div>
                    : null
                }
                </div>

                {
                    url <= 3
                    ? <div className="main_prd__btn_more">
                        <Button variant="outline-primary" size="lg" onClick={()=>{
                            
                            
                            if( url > 3 ){
                                console.log('xx')
                                return false;
                            }
                            setLoad(true);

                            axios.get(`https://aluvy.github.io/react_shop/data${url}.json`)
                            .then((result)=>{
                                let copy = [...props.prd, ...result.data];
                                props.setPrd(copy);
                                setURL(url = url+1);
                                
                                setLoad(false);
                            })
                            .catch(()=>{
                                console.log('요청실패');
                                setLoad(false);
                            })
                            
                        }}>view more</Button>
                    </div>
                    : <Alert variant="light" style={{fontSize:".8rem", textAlign:"center",border:"1px solid #ddd"}}>
                        데이터가 없습니다.
                    </Alert>
                }

            </Container>
        </div>
    )
}

function Event(props){
    return (
        <div>
            event
        </div>
    );
}

export default App;
