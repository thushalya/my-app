import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../assets/css/UpdateProfile.css";
import '../../assets/font-awesome/css/font-awesome.css';
import HeaderTwo from "../../components/headers/HeaderTwo";
import UserServices from '../../services/API/UserServices';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Loader from '../../components/loader/Loader';
import Avatar from '@mui/material/Avatar';
import '../../assets/css/Profile.css';
import ChangePassword from './ChangePassword';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { CountryDropdown } from 'react-country-region-selector';
import ChangePassModal from '@mui/material/Modal';
import { Box } from '@mui/system';
import Token from "../../services/Token";
import { useDispatch, useSelector } from 'react-redux';
import { saveImage } from '../../redux/profile';
import PageLoader from '../../components/pageLoader/PageLoader';
import Swal from 'sweetalert2';
import defaultPic from "../../assets/DefaultProfilePic/default_image.png";

const style = {
    position: 'relative',
    top: '40%',
    left: '50%',
    width: 800,
    maxWidth: '80%',
    transform: 'translate(-60%, -5%)',
    paddingLeft: 0,
    paddingRight:0
  };

// toasts
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


const Profile = () => { 

    const [loader, setLoader] = useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    var [state, setState] = useState(formValues);
    const [fNameError,setfNameError]=useState("")
    const [lNameError,setlNameError]=useState("")
    const [emailError, setEmailError] =useState("")
    const [dobError,setDobError]=useState("")
    const [isShown,setIsShown]=useState(false)

    const userDecode = Token.getAuth() // get token from storage
    const id = userDecode['user_id'] // get user id from token

    const formValues = {    // initial form values
        'First Name': '',
        'Last Name': '',
        'DOB':'',
        'Country':''
    }


    const {link} = useSelector((state)=>state.profile)  // getting image link from redux store
    const dispatch = useDispatch()

    

    // handle change function
    const handleSubmit = async() => {
        try {
            const response=await UserServices.updateprofile(state,id)   // send data to backend
            if (response.status === 201) {
                Toast.fire({
                    icon: 'success',
                    title: 'Profile updated successfully'
                })
            }
        } catch (error) {
            console.log(error)
            
        }
    };

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);   //hide loader
        }, 1000)
        getUser();  //get user details
    }, [])

    // get user details
    const getUser = async () => {
        try {
            const response = await UserServices.getUser(id);
            const getuser=response.data.data

            state = {
                'First Name': getuser['firstname'],
                'Last Name' : getuser['lastname'],
                'ImagePath':getuser['imagepath'],
                'DOB':getuser['dob'],
                'Country':getuser['country']
            }
            setState(state)

        }
        catch (err) {
            console.log(err);

        }
    }

    // change photo
    const handleChangePhoto= function(e){

        const choosedFile = e.target.files[0];

        if (choosedFile) {

            const reader = new FileReader();
            reader.addEventListener('load', function(){     //load image
                document.getElementById('photo').setAttribute('src', reader.result);
                
            });
            

            reader.readAsDataURL(choosedFile);  //read image
            try{
                const formData=new FormData();
                formData.append('Image',choosedFile)    //append image
                const call=async()=>{   
                    
                    try { 
                        const response =await UserServices.updatePhoto(id,formData);
                        if(response.status===200){
                            Toast.fire({
                                icon: 'success',
                                title: 'Profile photo updated'
                                })
                            dispatch(saveImage(response['data']['data']['imagepath']))
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    
                    
                }
                call()
            }
            catch(error){
                console.log(error)
            }
        }
    }


    const handleDOBChange = (newValue ) => {
    setState({...state,'DOB':newValue['$d'].toLocaleDateString()});
    };


    const handleCountryChange=(value)=>{
    setState({...state,'Country':value})

    }


    const handleChange = event => {
    setState({...state,[event.target.name]:event.target.value})
    };


    if (loader) {
        return <PageLoader />
    }else{
        return (
            <div className='container2' style={{'display':'flex', 'flexDirection': 'column'}}>
            <HeaderTwo/>
            
            <div className='form-container col-xl-5 mt-5 pt-5 mx-auto profile-form display-flex flex-column'>
                
                <h1 className='fs-1 text-primary' style={{marginTop:'-40px'}}>Profile Details</h1>


                <div onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)} className="profile-pic-div" style={{position: 'relative', left: '50%', marginTop:'-200px', maxWidth:'50%'}}>
                    <img  data-testid='profile-pic' src={(link != '') ? link : defaultPic} id="photo" className='photo'/>
                    <input onChange={handleChangePhoto} type="file" id="file" className='file'/>
                { isShown && <label    htmlFor="file" id="uploadBtn" className='uploadBtn'>Choose Photo</label>}
                </div>
                <Form className="form-group register-form container col-xl-10 d-flex flex-column " style={style}>

                <FormControl sx={{ m: 1  }} variant="outlined" className="register-form-control">
                <InputLabel sx={{fontSize:"13px",mt:"-7px"}} className="inputLabel" htmlFor="outlined-adornment-firstname">
                First Name
                </InputLabel>
                <OutlinedInput data-testid='first-name' value={state['First Name']} className="outLineInput" id="outlined-adornment-firstname" type={"text"}
                    style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                    name="First Name" onChange={handleChange} error={fNameError != ""} label="First Name"/>
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
                <OutlinedInput  value={state['Last Name']} className="outLineInput" id="outlined-adornment-lastname" type={"text"}
                    style={{ color: "rgb(194, 193, 193)", fontSize: "13px" }}
                    name="Last Name" onChange={handleChange} error={lNameError != ""} label="Last Name"/>
                </FormControl>
                {lNameError !== "" && (
                    <p className=" login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                    {lNameError}
                    </p>
                )}
                    <FormControl sx={{ m: 1 }} variant="outlined" className="register-form-control">

                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{backgroundColor:'white'}} >
                        
                            <MobileDatePicker
                            label="Date of Birth"
                            inputFormat="MM/DD/YYYY"
                            value={state['DOB']? state['DOB']:dayjs('01/01/2004')}
                            name={'DOB'}
                            sx={{ backgroundColor:'#0d6efd'}}
                            onChange={handleDOBChange}
                            renderInput={(params) => <TextField {...params} 
                                sx={{
                                    width: 'auto',
                                    "& .MuiInputBase-root": {
                                        height: 40,
                                    color:'#C1C0C0',
                                    fontSize:'14px'
                                    },
                                    ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":{
                                        color:'#C1C0C0',
                                        marginTop:'-5px',
                                        fontSize: '14px'
                                    }
                                }}
                                />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                        {emailError !== "" && (
                    <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                        {dobError}
                    </p>
                        )
                    }

                <CountryDropdown
                        className="register-form-control"
                        style={{color:'#C1C0C0', paddingTop:"8px", paddingBottom:'8px',paddingLeft:'14px',paddingRight:'14px', backgroundColor:'#30353F', fontSize:"13px", marginTop:"5px", maxWidth:'98%', marginLeft:'7px', marginRight:'8px'}}
                        value={state['Country']}
                        name={'Country'}
                        onChange={handleCountryChange} />
                {emailError !== "" && (
                    <p className="login-signup-error mb-0" style={{ color: "red", fontSize: "10px" }}>
                        {emailError}
                    </p>
                    )
                }

                <div data-testid='profile-elem' className='container1'>
                <Button data-testid='test-save' className="button" size="lg" onClick={handleSubmit} style={{fontSize:'14px'}}>Save</Button>
                <Button data-testid='test-change'className="button" size='lg' onClick={handleShow} style={{fontSize:'14px'}}>Change Password</Button>
                </div>
            </Form>


            </div>
            { show &&
                <div  style={{marginRight:'18px', width:'10px'}}>
                <ChangePassModal data-testid='change-password-modal' sx={{mt:-8, borderWidth:0 }}
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box style={{ maxWidth:'50%', transform:'translate(50%, 45%)'}}>                        
                    <ChangePassword sx={{w:'10px'}}/>
                    </Box>
                </ChangePassModal>
                </div>
            }
            </div >
        )
    }
}
export default Profile;
