import React, { useState, useEffect } from 'react'
// import { fetchToken } from '../../firebaseInit'
import { fetchToken } from '../../firebaseInit';
import AlertServices from '../../services/AlertServices';
// import { fetchToken} from './../../utils/firebaseInit';

const TokenRequest = props => {
  const [isTokenFound, setTokenFound] = useState(false)
  // const [getFcmToken,setFcmToken]=useState("")
  // const dispatch = useDispatch()

  console.log('Token found', isTokenFound)

  // To load once
  useEffect(() => {
    let data

    async function tokenFunc () {
      data = await fetchToken(setTokenFound)
      if (data) {
        console.log('Token is', data)
        const response = await AlertServices.addToken(data)
        console.log("token list is, ", response)
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
