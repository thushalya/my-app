import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import HeaderOne from "../../components/headers/HeaderOne";
import { Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useEffect } from "react";
import Validation from "../../Validations";
import AuthServices from "../../services/AuthServices"
import Loader from "../../components/loader/Loader";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register() {
  const Navigate = useNavigate();

  const formValues = {
    "First Name": "",
    "Last Name": "",
    Email: "",
    Password : "",
    "Confirm Password":"",
    
  };
  const [state, setState] = useState(formValues);
  
  const [fNameError,setfNameError]=useState("")
  const [lNameError,setlNameError]=useState("")
  const [emailError, setEmailError] =useState("")
  const [passwordError,setPasswordError] = useState("")
  const [confirmPassError,setConfirmPassError]=useState("")
  const errors = {};

  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loader, setLoader] = useState(false);

  const togglePassword=()=>{
    setShowPassword(!showPassword);
  }
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleChange =(e)=>{
    setState({
      ...state,[e.target.name] : e.target.value,
    });
  };

  const handleSubmit= async(e)=>{
    setLoader(true);
    e.preventDefault();
    const {value,error} = Validation.register(state);
    
    if(error){
      error.details.map((item)=>{
        errors[item.path[0]] = item.message;
      });
      if (errors["Confirm Password"])
       {setConfirmPassError(errors["Confim Password"]); setState({...state,["Confirm Password"]:"",})}
       else{
        setConfirmPassError("");
       }
      if (errors["Password"])
       {setPasswordError(errors["Password"]); setState({...state,["Password"]:"",})}
       else{
        setPasswordError("")
       }
      if(errors["First Name"])
       {setfNameError(errors["First Name"]); setState({ ...state, ["First Name"]: "" });}
       else{
        setfNameError("")
       }
      if(errors["Last Name"])
       {setlNameError(errors["Last Name"]); setState({ ...state, ["Last Name"]: "" });}
       else{
        setlNameError("")
       }
      if(errors["Email"])
       {setEmailError(errors["Email"]); setState({ ...state, ["Email"]: "" });}
       else{
        setEmailError("")
       }

    }else{
      try{
        const response = await AuthServices.register(state);
        console.log(response);
        if(response.status==201){
          Navigate("/login")
        }
      }catch(error){
        console.log(error.response.data.message)
        console.log("Failed registration")
      }
    }

    setTimeout(() => {
      setLoader(false);
    }, 10);
    console.log(state)
  }

   if (loader) {
     return <Loader position="absolute" top="45%" left="47%" />;
   }else{
    return (
      <div className="Register ">
        <HeaderOne />
        <div className="register-container col-9 col-sm-8 col-lg-5 col-md-6 col-xl-5 col-xxl-5 container d-flex flex-column " style={{ backgroundColor: "rgb(17, 23, 38)" }}>
          <header style={{textAlign:"center"}}>Create your account</header>
          
          <Form className="register-form container col-xl-10 d-flex flex-column ">

            <FormControl sx={{ m: 1  }} variant="outlined" className="register-form-control">
              <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-firstname">
                First Name
              </InputLabel>
              <OutlinedInput className="outLineInput" id="outlined-adornment-firstname" type={"text"}
                style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                name="First Name" value={state["First Name"]} onChange={handleChange} error={fNameError != ""} label="First Name"/>
            </FormControl>
            {fNameError !== "" && (
                <p className="login-signup-error  mb-0" style={{ color: "red", fontSize: "10px" }}>
                  {fNameError}
                </p>
              )}
            <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
              <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-lastname">
                Last Name
              </InputLabel>
              <OutlinedInput className="outLineInput" id="outlined-adornment-lastname" type={"text"}
                style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                name="Last Name" value={state["Last Name"]} onChange={handleChange} error={lNameError != ""} label="Last Name"/>
            </FormControl>
            {lNameError !== "" && (
                <p className=" login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                  {lNameError}
                </p>
              )}


              <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput data-testid='email' className="outLineInput" id="outlined-adornment-email" type={"email"}
                  style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                  name="Email" value={state["Email"]} onChange={handleChange} error={emailError != ""} label="Email"/>
              </FormControl>
              {emailError !== "" && (
                  <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                    {emailError}
                  </p>
                )
              }

            <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
              <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput className="outLineInput" id="outlined-adornment-password" type={showPassword ? "text" : "password"}
                style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                name="Password" value={state["Password"]} placeholder='password' onChange={handleChange} error={passwordError != ""}
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

            <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
              <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput className="outLineInput" id="outlined-adornment-confirmPassword" type={showConfirmPassword ? "text" : "password"}
                style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                name="Confirm Password" value={state["Confirm Password"]} onChange={handleChange} error={confirmPassError != ""}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle confrimPassword visibility" onClick={toggleConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
            {confirmPassError !== "" && (
              <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                {confirmPassError}
              </p>
            )}

              <button data-testid='register-elem' type="submit" className="login-btn signup-btn" id="login-btn" onClick={handleSubmit}>Sign up</button>
              <div className=" col-7 align-self-center justify-content-between register-login-footer register-footer">
                <p style={{ fontSize: "12px" }}>Already have an account?</p>
                <span style={{ fontSize: "12px" }}><Link style={{textDecoration:"none"}} to="/login">Login</Link></span>
              </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
