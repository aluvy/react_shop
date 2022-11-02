import { useParams } from 'react-router-dom';
import { Navbar, Container, Button, Alert, Stack, Form, Row, Col, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';



function Detail(props){

    let {id} = useParams();
    let useprd = props.prd.find( x => x.id.toString() === id);
    let [alert, setAlert] = useState(true);
    let [quantity, setQuantity] = useState(0);
    let [tab, setTab] = useState(0);
    let [fade, setFade] = useState('');

    useEffect(()=>{
        let timer = setTimeout(()=>{ setAlert(false) }, 2000);
        let time = setTimeout(()=>{ setFade('end') }, 10)

        if( isNaN(Number(quantity)) ){
            window.alert("숫자만 입력해주세요");
            setQuantity(0);
            document.querySelector(".quantity_input").value = "";
            document.querySelector(".quantity_input").focus();
        }

        return ()=>{
            clearTimeout(timer);
            setQuantity(0);
            
            clearTimeout(time);
            setFade('')
        }
    }, [quantity])

    return (
        <div className={`detail fade-start ${fade}`}>
            
            <div className="detail_prdinfo">
                <img src={process.env.PUBLIC_URL + `/img/product${useprd.id}.jpg`} alt="product img" />
                <div className="detail_prdinfo__ttl">
                    <p>{useprd.content}</p>
                    <h3>{useprd.title}</h3>
                    <span>{useprd.price}</span>

                    <hr />

                    <Alert variant="light" style={{paddingLeft:"0", paddingRight:"0"}}>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2} style={{fontSize:'.9rem'}}>구매수량</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="수량을 입력해주세요" className="quantity_input" onChange={(e)=>{ setQuantity(e.target.value) }} ></Form.Control>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Alert>

                </div>
            </div>

            {
                alert === true
                ? <Container fluid className="surprise_sale">
                    <Alert variant="success">
                        <Stack direction="horizontal">
                            <div>😊 2초 이내 구매 시 50% 할인!! 🤩</div>
                            <div className="ms-auto">
                                <Button variant="outline-success" size="sm">Buy 🎁</Button>
                            </div>
                        </Stack>
                    </Alert>
                </Container>
                : null
            }

            <Container>
                <Nav variant="tabs" defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link eventKey="link0" onClick={()=>{ setTab(0) }}>상품정보</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link1" onClick={()=>{ setTab(1) }}>배송 유의사항</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link2" onClick={()=>{ setTab(2) }}>판매자 정보</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
            <Container style={{margin:"1rem 0 0"}}>
                <TabContent tab={tab} />
            </Container>


            <Navbar bg="dark" fixed="bottom" className="detail_navbar">
                <Container>
                    <Button variant="dark" size="lg" className="detail_btn_buy">
                        Buy
                    </Button>
                </Container>
            </Navbar>
        </div>
    );
}

function TabContent({tab}){
    
    let [fade, setFade] = useState('');
    useEffect(()=>{

        let time = setTimeout(()=>{ setFade('end') }, 10)

        return ()=>{
            clearTimeout(time);
            setFade('');
        }
    },[tab]);

    return (
        <Container className={`detail__in_detail fade-start ${fade}`}>
            {
                [<div>
                    <h6>상품정보</h6>
                    <p>상품코드 : 432038</p>
                    <h6>브랜드 알림</h6>
                    <p>[판매정책] 가구의 부피/크기에 따라 반품 비용이 추가로 부과 됩니다.</p>
                </div>
                ,<div>
                    <h6>배송 유의사항</h6>
                    <p>제주/도서산간 추가 배송비 3,000(수량별 부과)</p>
                    <h6>상품 설명</h6>
                    <p>
                        티크 원목을 소재로 한 컴팩트한 사이즈의 보우 우든 펜던트입니다.<br />
                        작은 사이즈의 조명임에도 돋보이는 조형미와 유니크한 디자인으로 공간에 적절한 포인트를 주기에 충분합니다.<br /><br />

                        * LED 램프가 동봉되며 이 외 다른 램프 사용이 불가합니다.<br /><br /><br />

                        product size : W22xD22xH16.5(cm)<br />
                        material : teak<br />
                        finish : eco-friendly oil<br />
                        lamp : E17 base LED lamp<br />
                        country of origin : Indonesia
                    </p>
                </div>
                ,<div>
                    <h6>판매자정보</h6>
                    <p>
                        상호명 :	주식회사 리브라 (Libra Co.,Ltd.)<br />
                        사업자등록번호 :	2408801231<br />
                        통신판매업번호 :	2022-서울성동-00616<br />
                        대표자 :	이원<br />
                        사업장 : 소재지	(04775) 서울특별시 성동구 성수동1가 288 (성수동)
                    </p>
                </div>][tab]
            }
        </Container>
    );
}

export default Detail;