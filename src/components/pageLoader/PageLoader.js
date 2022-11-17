import React, {Fragment} from 'react';
import "../../assets/css/pageLoader.css";
const PageLoader = () => {
	return(
		<Fragment> 
            <div data-testid='loader' className="colorchange">
                <div className="center">
                    <div className="ring"/>
                    <span className='loading'>crypsto|x|plorer</span>
                </div>
            </div>
		</Fragment>
	);
};

export default PageLoader;

