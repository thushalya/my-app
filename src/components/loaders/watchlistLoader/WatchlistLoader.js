// loader 
import React from 'react';
import Lottie from 'react-lottie';
import animationData from './watchlist_loader.json';


const WatchlistLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    };
    
    return (
        <div className="watchlist-loader">
        <Lottie options={defaultOptions} height={450} width={450}/>
        </div>
    );
};

export default WatchlistLoader;

