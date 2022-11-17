import { useEffect, useState } from "react";
import * as common from "./../script.js";

function ScrollTop(){
	let [scroll, setScroll] = useState('');

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
		<div className={`btn__scrolltop ${scroll}`} onClick={common.scrollTop}>
			<svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="KeyboardArrowUpIcon" fill="#fff">
				<path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
			</svg>
		</div>
	)
}
export default ScrollTop;