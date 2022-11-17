import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Navbar, Nav, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import * as common from "../script.js";

import { addItem } from './../store/cartSlice.js';

function Detail({prd}){

	let { prdId } = useParams();
	let usePrd = prd.find((a) => a.id.toString() === prdId);

	let [event, setEvent] = useState(true);
	let [tab, setTab] = useState(0);
	let [animation, setAnimation] = useState('');

	let [modalShow, setModalShow] = useState(false);

	let dispatch = useDispatch();

	useEffect(()=>{

		let eventTimer = setTimeout(()=>{ setEvent(false) }, 2000);
		let fadeTimer = setTimeout(()=>{ setAnimation('end') }, 100);

		return ()=>{
			clearTimeout(eventTimer);
			clearTimeout(fadeTimer);
			setAnimation('')
		}
	}, []);

	useEffect(()=>{
		let latest = JSON.parse( localStorage.getItem("latest") )
		let idx = latest.findIndex((x)=>{ return String(x.id) === String(usePrd.id) })
		if( idx < 0 ){
			latest.unshift(usePrd);
			localStorage.setItem("latest", JSON.stringify(latest))
		}
	},[usePrd])

    return(
        <article id="detail" className={`fade-start ${animation}`}>
			{/* <ScrollTop /> */}
            <div className="detail_prd">
                <img src={process.env.PUBLIC_URL + `/img/product${usePrd.id}.jpg`} alt="product" />
				<Container fluid>
					<div className="detail_prd_info">
						<span>{ usePrd.content }</span>
						<p>{ usePrd.title }</p>
						<strong>{ common.format_money(usePrd.price) }</strong>
					</div>
					<hr />
					<Form>
						<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
							<Form.Label column xs={4}>quantity</Form.Label>
							<Col xs={8}>
								<Form.Control type="number" placeholder="수량을 입력하세요" />
							</Col>
						</Form.Group>
					</Form>
				</Container>
            </div>

			<div className="detail_tabs_wrap">
				<Container>
					<Nav variant="tabs" defaultActiveKey="link1">
						<Nav.Item>
							<Nav.Link eventKey="link1" onClick={()=>{setTab(0)}}>Detail</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link2" onClick={()=>{setTab(1)}}>Delivery</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link3" onClick={()=>{setTab(2)}}>Information</Nav.Link>
						</Nav.Item>
					</Nav>
					<div className="tab_contents">
						<TabContents tab={tab} />
					</div>
				</Container>
			</div>


			{
				event === true
				?
				<Navbar bg="warning" variant="dark" fixed="bottom" className="detail_foot_fix">
					<Container fluid className="detail__btn">
						<div className="d-grid gap-2">
							<Button variant="warning" size="lg" className="btn__buy" style={{fontSize:".95rem", lineHeight:"30px"}}
								onClick={()=>{
									dispatch(addItem( { id:usePrd.id, name:usePrd.title, count: 1 } ))
									setModalShow(true)
								}}>
								😎 2초 안에 구매하면 50% 할인!
							</Button>
						</div>
					</Container>
				</Navbar>
				:
				<Navbar bg="dark" variant="dark" fixed="bottom" className="detail_foot_fix">
					<Container fluid className="detail__btn">
						<div className="d-grid gap-2">
							<Button variant="dark" size="lg" className="btn__buy"
								onClick={()=>{
									dispatch(addItem( { id:usePrd.id, name:usePrd.title, count: 1 } ))
									setModalShow(true)
								}}>
								Buy
							</Button>
						</div>
					</Container>
				</Navbar>
			}

			<AddCart show={modalShow} onHide={() => setModalShow(false)} />
        </article>
    );
}

export default Detail;


function TabContents({tab}){

	let [animation, setAnimation] = useState('');

	useEffect(()=>{

		let timer = setTimeout(()=>{ setAnimation('end') }, 100);

		return ()=>{
			clearTimeout(timer);
			setAnimation('');
		}
	}, []);
	
	return (
		<div className={`fade-start ${animation}`}>
			{
				[<div className="detail_tabs_item">
					<h3>Detail</h3>
					<div><img src={process.env.PUBLIC_URL + `/img/detail1.jpg`} alt="detail1" /></div>
					<div><img src={process.env.PUBLIC_URL + `/img/detail2.jpg`} alt="detail2" /></div>
				</div>,<div className="detail_tabs_item">
					<h3>Delivery</h3>
					<ul>
						<li>상품별로 상품 특성 및 배송지에 따라 배송유형 및 소요기간이 달라집니다.</li>
						<li>일부 주문상품 또는 예약상품의 경우 기본 배송일 외에 추가 배송 소요일이 발생될 수 있습니다.</li>
						<li>동일 브랜드의 상품이라도 상품별 출고일시가 달라 각각 배송될 수 있습니다.</li>
						<li>제주 및 도서산간 지역은 출고, 반품, 교환시 추가 배송비(항공, 도선료)가 부과 될 수 있습니다.</li>
						<li>상품의 배송비는 공급업체의 정책에 따라 다르오며 공휴일 및 휴일은 배송이 불가합니다.</li>
					</ul>
				</div>,<div className="detail_tabs_item">
					<h3>Information</h3>
					<ul>
						<li>고객님이 받으신 상품의 내용이 표시 광고 및 계약 내용과 다른 경우 상품을 수령하신 날로부터 3개월 이내 또는 그 사실을 안 날(알 수 있었던 날) 부터 30일 이내 신청이 가능합니다.</li>
						<li>상품하자 이외 사이즈, 색상교환 등 단순 변심에 의한 교환/반품 택배비 고객부담으로 왕복택배비가 발생합니다. (전자상거래 등에서의 소비자보호에 관한 법률 제18조(청약 철회등)9항에 의거 소비자의 사정에 의한 청약 철회 시 택배비는 소비자 부담입니다.)</li>
						<li>결제완료 직후 즉시 주문취소는 "MY Page - 취소/교환/반품 신청"에서 직접 처리 가능합니다.</li>
						<li>주문완료 후 재고 부족 등으로 인해 주문 취소 처리가 될 수도 있는 점 양해 부탁드립니다.</li>
						<li>주문상태가 상품준비중인 경우 취소신청이 가능하며 판매자의 승인 여부(이미 배송을 했거나 포장을 완료한 경우)에 따라 취소가 불가능할 수 있습니다.</li>
						<li>교환 신청은 최초 1회에 한하며, 교환 배송 완료 후에는 추가 교환 신청은 불가합니다.</li>
						<li>반품/교환은 미사용 제품에 한해 배송완료 후 7일 이내 접수하여 주십시오.</li>
						<li>임의반품은 불가하오니 반드시 고객센터나 "MY Page - 주문취소/교환/반품 신청"을 통해서 신청접수를 하시기 바랍니다.</li>
						<li>상품하자, 오배송의 경우 택배비 무료로 교환/반품이 가능하지만 모니터의 색상차이, 착용감, 사이즈의 개인의 선호도는 상품의 하자 사유가 아닙니다.</li>
						<li>고객 부주의로 상품이 훼손, 변경된 경우 반품 / 교환이 불가능 합니다.</li>
						<li>취소/반품 대금환불이 지연 시 전자상거래법에 의거하여 환불지연 배상처리 절차가 진행됩니다.</li>
					</ul>
				</div>][tab]
			}
		</div>
	)
}



function AddCart(props){

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			>
			{/* <Modal.Header closeButton>
			</Modal.Header> */}
			<Modal.Body className="addCart__notice-wrap">
				<div className="addCart__notice-text">
					상품이 장바구니에 담겼습니다.
				</div>
				<div className="addCart__notice-btn">

					<Link to="/cart"><Button variant="outline-dark">장바구니 바로가기</Button></Link>
					<Button variant="dark" onClick={props.onHide}>쇼핑 계속하기</Button>

				</div>
			</Modal.Body>
		</Modal>
	)
}