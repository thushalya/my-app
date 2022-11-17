import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../assets/css/UpdateProfile.css";
import '../../assets/font-awesome/css/font-awesome.css';
import UserServices from '../../services/API/UserServices';
import Validations from '../../Validations';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Token from "../../services/Token";
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';


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
  });

const ChangePassword = () => {  // change password

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const formValues = {
        'Current Password': '',
        'New Password': '',
        'Confirm Password': '',
    }

    var [state, setState] = useState(formValues);
    const [errordata, setError] = useState(formValues);
    const [newPasswordError,setNewPasswordError]=useState("")
    const [confirmPassError,setConfirmPassError]=useState("")

    const [showPassword,setShowPassword]=useState(false)
    const [showNewPassword,setShowNewPassword]=useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword=()=>{ // show password
        setShowPassword(!showPassword);
    }
    const toggleConfirmPassword = () => {   // show confirm password
        setShowConfirmPassword(!showConfirmPassword);
    };
    const toggleNewPassword=()=>{ // show new password
        setShowNewPassword(!showNewPassword);
    }
    const handleChange =(e)=>{  // handle change
        setState({
          ...state,[e.target.name] : e.target.value,
        });
    };
    const handleUser = (event) => { // handle user
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const errors = {};

    const handleSubmit= async(e)=>{     // handle submit
        e.preventDefault()
        const password = state["New Password"]
        const re_password = state["Confirm Password"]
        const old_password = state["Current Password"]
        try {
            var userDecode = jwtDecode(Token.getAccessToken())  // decode token
        } catch (error) {   // catch error
            userDecode= null   
            console.log(error) 
        }
        const user_id = userDecode['user_id']   // get user id
        setLoader(true);
        const { value, error } = Validations.userUpdatePwd({ password, re_password });

        if (error) {    // if error
            console.log(error);
            const errors = {};
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });
            
            if (errors.password)
                setNewPasswordError(errors.password);
            else if (errors.re_password)
                setNewPasswordError("")
                setConfirmPassError('Two passwords do not match. Try again');

        }
        else {  
            setConfirmPassError("")
            try {
                const response = await UserServices.updatePasswordByUser({ password, old_password, user_id });
                
                if (response.status === 200) {      // if response status is 200        
                    Toast.fire({    
                        icon: 'success',
                        title: 'Password Updated Successfully'
                    })
                    setTimeout(navigate('/logout'), 3000);
                }

            } catch (error) {   // catch error
                Toast.fire({
                    icon: 'error',
                    title: 'Error Occured'
                })
                console.log(error.response)
            }
        }
        setTimeout(() => {
            setLoader(false);
        }, 200);
    }
        return (
            <div style={{ margin:'auto', backgroundColor:'#20232B', marginTop:'15%'}}>

                <div className='form-container mt-5 pt-5'>

                    <h1 className='fs-1 text-primary'>Change Password</h1>

                        <Form className="register-form container col-xl-10 d-flex flex-column ">

                        <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                                    <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-password">
                                    Current Password
                                    </InputLabel>
                                    <OutlinedInput data-testid='current-password' className="outLineInput" id="outlined-adornment-password" type={showPassword ? "text" : "password"}
                                    style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                                    name="Current Password" placeholder='password' onChange={handleChange}
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

                        <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                                <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-password">
                                New Password
                                </InputLabel>
                                <OutlinedInput data-testid='new-password' className="outLineInput" id="outlined-adornment-password" type={showNewPassword ? "text" : "password"}
                                style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                                name="New Password" placeholder='password' onChange={handleChange} error={newPasswordError != ""}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={toggleNewPassword} edge="end">
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                                label="New Password"
                                />
                        </FormControl>

                        {newPasswordError !== "" && (
                            <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                            {newPasswordError}
                            </p>
                        )}

                        <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">
                        <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel"htmlFor="outlined-adornment-confirmPassword">
                        Confirm Password
                        </InputLabel>
                        <OutlinedInput data-testid='confirm-password' className="outLineInput" id="outlined-adornment-confirmPassword" type={showConfirmPassword ? "text" : "password"}
                        style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                        name="Confirm Password" onChange={handleChange} error={confirmPassError != ""}
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
                        
                        <button data-testid='chng-pwd-elem' type='submit'  className="login-btn signup-btn" id="login-btn" onClick={handleSubmit}>Save</button>

                    </Form>
        </div>
    </div >
        )
    }


export default ChangePassword;