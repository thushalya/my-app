// loader 
import React from 'react';
import Lottie from 'react-lottie';
import animationData from './no_items.json';


const NoItemsLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    };
    
    return (
        <div className="no-item-loader">
        <Lottie options={defaultOptions} height={300} width={300}/>
        </div>
    );
};

export default NoItemsLoader;

