import React from 'react';
import { useState } from 'react';

// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to 
// keep file size down
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


export default function Example() {

    const [state, setState] = useState();
    // this.state = { country: '', region: '' };


 const selectCountry =(val)=> {
    console.log(val)
    setState(val);
  }

//   selectRegion (val) {
//     this.setState({ region: val });
//   }
    return (
      <div>
        <CountryDropdown
        style={{'color':'red','fontSize':'30px'}}
          value={state}
          onChange={(val) => (selectCountry(val))} />
        {/* <RegionDropdown
          country={country}
          value={region}
          onChange={(val) => this.selectRegion(val)} /> */}
      </div>
    );
  
}