import {initializeApp} from 'firebase/app';
import {getMessaging,getToken,onMessage} from 'firebase/messaging';



// const dispatch = useDispatch()
const firebaseApp= initializeApp( {
  apiKey: "AIzaSyAlhYcsvmpoxbCZ_GmR0E2Ibf4FhsE4-oQ",
  authDomain: "crypstoxplorer-8e0db.firebaseapp.com",
  projectId: "crypstoxplorer-8e0db",
  storageBucket: "crypstoxplorer-8e0db.appspot.com",
  messagingSenderId: "122369437189",
  appId: "1:122369437189:web:f058b71dd412d0baf3366c",
  measurementId: "G-0ZKZDG9WV9"
})

const messaging=getMessaging(firebaseApp)
// const messaging = firebase.messaging()

const publicKey =
'BAzsYhF6mjX-DQCCb3J8a4d9xretgao7ejLxHbu4DpJXhMMWpiPC6-6QmWW9ElBIhPm56-89TWUZWhpzMKn-BfQ'


export const fetchToken = async (setTokenFound) => {
  let currentToken = ''

  try {
    currentToken = await getToken(messaging,{ vapidKey: publicKey })
    if (currentToken) {
      setTokenFound(true)
      // dispatch(postFirebaseToken(currentToken))
      // setFcmToken(currentToken)
      // console.log('token', currentToken)
    } else {
      console.log('No token found')
      setTokenFound(false)
      // setFcmToken('')
    }
    return currentToken
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error)
  }

  
}



export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
