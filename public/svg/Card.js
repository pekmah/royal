import React from 'react';

function CardSvg(props) {
    return <div className={`${props?.className}`}>
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 25 25" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M 1.504 10.5 H 23.504 M 1.504 7.5 C 1.504 5.843 2.847 4.5 4.504 4.5 H 20.504 C 22.161 4.5 23.504 5.843 23.504 7.5 V 18.5 C 23.504 20.157 22.161 21.5 20.504 21.5 H 4.504 C 2.847 21.5 1.504 20.157 1.504 18.5 V 7.5 Z"
                stroke="white" strokeWidth="2"/>
        </svg>
    </div>;
}

export default CardSvg;