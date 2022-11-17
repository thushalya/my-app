// loader 
import React from 'react';
import Lottie from 'react-lottie';
import animationData from './coin_loader.json';

const CoinLoader = () => {
    console.log("trying to load the animation");
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
        <Lottie options={defaultOptions} height={500} width={500}/>
        </div>
    );
};

export default CoinLoader;

// bookmark bar component


