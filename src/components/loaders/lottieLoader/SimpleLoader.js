// loader 
import React from 'react';
import Lottie from 'react-lottie';
import animationData from './simple_loader.json';

const SimpleLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    };
    
    return (
        <div>
        <Lottie options={defaultOptions} height={1000} width={500} />
        </div>
    );
};

export default SimpleLoader;


