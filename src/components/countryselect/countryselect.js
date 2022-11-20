import React from 'react';
import { useState } from 'react';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


export default function Example() {

    const [state, setState] = useState();


 const selectCountry =(val)=> {
    console.log(val)
    setState(val);
  }

    return (
      <div>
        <CountryDropdown
        style={{'color':'red','fontSize':'30px'}}
          value={state}
          onChange={(val) => (selectCountry(val))} />
      </div>
    );
  
}