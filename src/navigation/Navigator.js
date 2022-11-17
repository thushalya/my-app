import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import Loader from "../components/loader/Loader";
import Token from "../services/Token";
import jwtDecode from "jwt-decode";

function Navigator() {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    useEffect(() => {
      getUser();
    }, []);

    const getUser = async(userRole)=>{
        setLoader(true);
        try {
            try {
                var user = jwtDecode(Token.getAccessToken())
            } catch (error) {
                user= null    
            }
            
            if(user?.role=="2"){
                navigate('/')
            }else if (user?.role=="1"){
                navigate('/admin')
            }else{
                navigate('/unauthorized')
            }

        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }


  if (loader) {
    return <Loader position="absolute" top="45%" left="45"/>;
  } else {
    return <div className="dashboard"></div>;
  }
}

export default Navigator;
