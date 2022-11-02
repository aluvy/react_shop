import { useState } from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';

function About(props){
    let navigate = useNavigate();
    return (
        <div>
            Guide to Better Choice<br />
            Making Different Shopping Experience<br />
            Delivering product and brand value<br />
            Deep-dive in customers'Live<br />
            2,300,000+ Users meet 6,400+ brands every month<br />
            Growing with them<br />
            Spotlight on Media<br />
            Contact Us<br/>
            <div>
                <button onClick={()=>{ navigate("/about/experience") }}>Experience</button>
                <button onClick={()=>{ navigate("/about/delivering") }}>Delivering</button>
            </div>
            <Outlet></Outlet>
        </div>
    );
}

export default About;