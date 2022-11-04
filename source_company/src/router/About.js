import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { gsap } from 'gsap';
import '../App.css';


function About(props) {
    let navigate = useNavigate();

    return (
        <article id="about">
            <div className="intro">
                <h2>Guide to Better Choice</h2>
                <p>
                    29CM는 '고객의 더 나은 선택을 돕는다'는 미션을 전개하는 온라인 셀렉트샵입니다.
                    이 독특한 미션으로부터 출발해 29CM는 우리만의 방식으로 브랜드, 고객에게 모두 대체 불가능한 커머스 플랫폼을 만들어나가고 있습니다.<br/><br/>
                    모두가 더 많고 저렴한 상품을 외칠 때, 각 브랜드만의 고유한 가치관을 알리기 위해 고민합니다. 고객의 일상에서 더 나은 선택지를 제안하고 스토리텔링합니다. 고객과 브랜드 사이에서, 29CM는 매번 새로운 제안과 큐레이션, 신규 콘텐츠를 선보이고 있습니다.
                </p>
            </div>

            {/* <div className="intro_tab">
                <button onClick={()=>{ navigate("/about/shopping") }}>Shopping</button>
                <button onClick={()=>{ navigate("/about/delivering") }}>Delivering</button>
            </div> */}

            <Nav variant="pills" defaultActiveKey="/about/shopping" className="intro_tab">
                <Nav.Item>
                    <Nav.Link eventKey="/about/shopping" onClick={()=>{ navigate("/about/shopping") }}>Shopping</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/about/delivering" onClick={()=>{ navigate("/about/delivering") }}>Delivering</Nav.Link>
                </Nav.Item>
            </Nav>

            <div className="about_cont_wrap">
                <Outlet />
            </div>
        </article>
    )
}

function AboutShopping(){
    return (
        <div id="shopping">
            <h2>Making Different Shopping Experience</h2>
            <p>29CM가 제품과 브랜드를 소개하는 방식은 다릅니다. 우리만의 시선으로 그들의 가치를 전달하기 위한 최적의 방법을 고민하고 글과 이미지, 영상 등 다양한 방식으로 직접 제작하여 소비자에게 더 나은 선택을 제시합니다.</p>
            <ul>
                <li>
                    <strong>Main Feed</strong>
                    <span>매거진을 읽는 듯한 경험</span>
                </li>
                <li>
                    <strong>PT</strong>
                    <span>한 브랜드를 집중 조명하는</span>
                </li>
                <li>
                    <strong>Special Order</strong>
                    <span>특별한 상품 특별한 혜택</span>
                </li>
                <li>
                    <strong>Welove/Culture</strong>
                    <span>다양한 라이프 스타일 제안</span>
                </li>
            </ul>
        </div>
    );
}

function AboutDelivering(){
    
    const ref = useRef(null);
    
    function imageMotion(){
        const elem = ref.current;

        let tl = gsap.timeline({
            repeat:-1,
            repeatDelay:2,
            // yoyo:true
        });

        tl.set( elem.querySelector(".gsap-image"),
            { x: '100%' },
        );

        tl.to( elem.querySelector(".gsap-image"),
            { x: -1500, duration:10, ease: 'none' },
        );
    }

    useEffect(()=>{

        imageMotion();

        // let brand = document.querySelector(".about_brand");
        // let left = Math.floor(window.innerWidth / 2);
        // let animation = setInterval(()=>{
        //     brand.style.left = `${left}px`;
        //     left = left-1;
        //     if( left < -1200 ){ clearInterval(animation); }
        // }, 10);


        return ()=>{
            // clearInterval(animation);
            // left = window.innerWidth / 2;
        }
    }, [])
    return (
        <div id="delivering" ref={ref}>
            <h2>Delivering product and Brand Value</h2>
            <p>29CM는 로컬부터 글로벌 브랜드까지 다양한 브랜드를 검토하여, 브랜드 포트폴리오를 확대하고 있습니다.
                브랜드에게, 단기적인 매출만이 아닌 장기적인 브랜드 가치 극대화를 지향하는 차별화된 파트너십을 제공하고 있습니다.</p>
            {/* <div className="about_brand_wrap">
                <div className="about_brand">
                    <img src={process.env.PUBLIC_URL + `/img/making_brand_pc.jpg`} alt="brand value" />
                </div>
            </div> */}
            <div style={{ overflow:"hidden", margin:"3rem -2rem 0", height:"250px" }}>
                <div className="gsap-image">
                    <img src={process.env.PUBLIC_URL + `/img/making_brand_pc.jpg`} alt="brand value" style={{width:"1500px"}} />
                </div>
            </div>
        </div>
    );
}

export { About, AboutShopping, AboutDelivering };