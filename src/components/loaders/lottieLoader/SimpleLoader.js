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
        <div className='simple-loader-div'>
        <Lottie options={defaultOptions} height={300} width={300} />
        </div>
    );
};

export default SimpleLoader;


