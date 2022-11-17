import React, { useState, useEffect } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Validation from "../../Validations";
import AuthServices from "../../services/AuthServices";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from "../../components/loader/Loader";
import jwtDecode from "jwt-decode";
import Token from "../../services/Token";
import {GoogleLogin} from 'react-google-login';
import { dark } from "@mui/material/styles/createPalette";
import { fetchToken } from '../../firebaseInit';
import AlertServices from '../../services/AlertServices';
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../redux/alert";
import UserServices from "../../services/API/UserServices";
import { saveImage } from "../../redux/profile";
import Swal from 'sweetalert2';
import PageLoader from "../../components/pageLoader/PageLoader";

// import TokenRequest from "../notification/TokenRequest";


function Login() {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/navigate";

  const formValues = {
    Email: "",
    Password: "",
  };

  // google login
  const onSuccess = (res) => {
    console.log("Login SUCCESS! Current user", res.profileObj);
    const response = AuthServices.googleLogin(res);
    console.log("Response, ", response)
  }
  const onFailure = (res) => {
      console.log("Login FAILED! res:", res);
  }
  const client_id = "106174331388-iokgsqk1gm07khha74tq9evt4k798ucf.apps.googleusercontent.com"

  ////////////////////////////////////////

  const [state, setState] = useState(formValues);
  // const [bool, setBool] = useState(false)
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loader, setLoader] = useState(true);
  const [isTokenFound, setTokenFound] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  // redux for token
  let {token} = useSelector((state)=>state.alert)
  const dispatch = useDispatch()
  let {link} = useSelector((state)=>state.profile)

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    // setLoader(true);
    e.preventDefault();
    const { value, error } = Validation.login(state);
    if (error) {
      const errors = {};
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
      if (errors.Email) setEmailError("Invalid email");

      if (errors.Password) setPasswordError("Invalid password");
    } else {
      try {
        const response = await AuthServices.login(state);
        console.log(" response is", response);
        // check for 200
        if (response.status == 200){
          
          // const [getFcmToken,setFcmToken]=useState("")
          console.log("response of loggin in....", response)
          // dispatch(save(response.data))

          console.log('Token found', isTokenFound)

          console.log("logging in...");
        const id = jwtDecode(Token.getAccessToken())['user_id'];
        console.log("id is", id);
        const response_ = await UserServices.getUser(id);
        const getuser=response_.data.data
        if (getuser['active'] == '0'){
            Swal.fire({
              title:'Your account has been deactivated',
              text:'Please contact admin',
              icon:'question',
              confirmButtonText:'OK',
              background:'#111726',
              color:'white'
            }
          ) 
          throw new Error("Your account is not active. Please contact admin.")
        }
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          background:'#111726',
          color:'white',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Login Successful'
        })
        console.log('response',getuser['imagepath'])
        dispatch(saveImage(getuser['imagepath']))
        

          // To load once
            

            async function tokenFunc () {
              token = await fetchToken(setTokenFound)
              if (token) {
                console.log('Token is', token)
                const response = await AlertServices.addToken(token)
                console.log("token list is, ", response)
              }
              dispatch(save(token))
              return token
            }
            Notification.requestPermission().then(function(permission){
              console.log(permission)
              if(permission=='granted'){
                tokenFunc()
              }
          })

        }
        

        navigate(from, { replace: true });

      }
      catch (error) {
        console.log(error)
        console.log("error",error?.response?.data?.message);
        console.log("Login failed");
      }
      setEmailError("");
      setPasswordError("");
    }

      // setLoader(false);
    
  };

  if (loader) {
    return <PageLoader />
  } else {
    return (
      <div className="Login">
        <HeaderOne />
        <div
          className="login-container col-9 col-sm-6 col-lg-4 col-md-5 col-xl-4 col-xxl-4 container d-flex flex-column"
          style={{ backgroundColor: "rgb(17, 23, 38)" }}
        >
          <header>Welcome</header>
          <Form className=" container col-xl-10 d-flex flex-column ">
            <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
              <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-email">
                Email
              </InputLabel>
              <OutlinedInput data-testid="email" className="outLineInput" id="outlined-adornment-email" type={"email"}
                style={{ color: "rgb(194, 193, 193)" , fontSize: "13px"}}
                name="Email" onChange={handleChange} error={emailError != "" && true} label="Password"/>
            </FormControl>
            {emailError !== "" && (
              <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                {emailError}
              </p>
            )}

            <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
              <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput placeholder="password" className="outLineInput" id="outlined-adornment-password" type={showPassword ? "text" : "password"}
                style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                name="Password" onChange={handleChange} error={passwordError != ""}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={togglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {passwordError !== "" && (
              <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                {passwordError}
              </p>
            )}

            <button data-testid='login-elem' type="submit" className="login-btn" id="login-btn" onClick={handleSubmit} >
              Login
            </button>
            {/* <div id="googleSignInButton" style={{position:'relative', display:'flex', justifyContent:'center', marginBottom:'25px', marginTop:'-10%'}}>
              <GoogleLogin
                  clientId={client_id}
                  buttonText="Sign in with google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                  theme='dark'
              />
            </div> */}
            <div className=" col-7 align-self-center justify-content-between register-login-footer login-footer">
              <p style={{ fontSize: "12px", color:'grey' }}>No account?</p>
              <span style={{ fontSize: "12px" }}>{" "}
                <Link style={{ textDecoration: "none", alignItems: "center" }} to="/register">
                  Signup now{" "}
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
