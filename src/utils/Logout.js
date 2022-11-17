import AuthServices from "../services/AuthServices";
import { useEffect,useState } from "react";
import Loader from "../components/loader/Loader";
import AlertServices from "../services/AlertServices";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import PageLoader from "../components/pageLoader/PageLoader";

function Logout() {

  const [loader, setLoader] = useState(false);
  useEffect(()=>{
    logout();
  },[])
  const {token} = useSelector((state)=>state.alert)
  console.log("tokens are in oder,", token)
  const logout = async () => {
    
    try {
      setLoader(true);
      // const response = await AuthServices.logout();
      const response = await AlertServices.removeToken(token);
      console.log("response remove token, ", response)
      localStorage.clear();
      window.location.href="/login";

    } catch (error) {
      localStorage.clear();
      window.location.href="/login";
      
    }
    setLoader(false); 
    
  }
  if(loader){
    return <PageLoader/>
  }
  return (
    <div>
      
    </div>
  )
}

export default Logout
