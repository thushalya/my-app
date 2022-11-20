import React, { useState, useEffect } from 'react'
import { fetchToken } from '../../firebaseInit';
import AlertServices from '../../services/AlertServices';

// firebase token request component
const TokenRequest = props => {
  const [isTokenFound, setTokenFound] = useState(false)

  // To load once
  useEffect(() => {
    let data

    async function tokenFunc () {
      data = await fetchToken(setTokenFound)
      if (data) {
        const response = await AlertServices.addToken(data)
      }
      return data
    }
    Notification.requestPermission().then(function(permission){
      console.log(permission)
      if(permission=='granted'){
        tokenFunc()
      }
  })
    // tokenFunc()
  }, [setTokenFound])

  return <></>
}

TokenRequest.propTypes = {}

export default TokenRequest
