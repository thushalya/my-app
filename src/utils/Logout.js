import AuthServices from "../services/AuthServices";
import { useEffect,useState } from "react";
import Loader from "../components/loader/Loader";
import AlertServices from "../services/AlertServices";
import { useSelect } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../components/pageLoader/PageLoader";
import { useNavigate } from "react-router";
import { save } from "../redux/alert";

function Logout() {

  const  navigate = useNavigate()
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch()
  useEffect(()=>{
    logout();
  },[])
  const {token} = useSelector((state)=>state.alert)
  console.log("tokens are in oder,", token)
  const logout = async () => {
    
    try {
      setLoader(true);
      // const response = await AuthServices.logout();
      // const response = await AlertServices.removeToken(token);
      // console.log("response remove token, ", response)
      dispatch(save(""))
      sessionStorage.clear();
      navigate("/login")

    } catch (error) {
      sessionStorage.clear();
      navigate("/login")
      
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
