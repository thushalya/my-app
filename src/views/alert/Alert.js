import React, { Component } from 'react'
import HeaderTwo from '../../components/headers/HeaderTwo';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import '../../assets/css/watchlist.css'
import { autocompleteClasses, Container } from '@mui/material';
import Token from '../../services/Token';
import WatchlistServices from '../../services/WatchlistServices';
import Loader from '../../components/loader/Loader';
import { Table } from 'react-bootstrap'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AlertServices from '../../services/AlertServices';
import AlarmAddOutlinedIcon from '@mui/icons-material/AlarmAddOutlined';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { Box } from '@mui/system';
import SimpleLoader from '../../components/loaders/lottieLoader/SimpleLoader';


export default function Alert({market}) {
    // popover
    const [anchorEl, setAnchorEl] = useState(null);
    const [loader, setLoader] = useState(true);
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
    
    const handleClick = (event) => {
      console.log(popLoading , "popLoading")
      console.log("data received ", data)
      
      if (!popLoading && data.length > 0){
        setPopLoading(true)
      }
      console.log("data triggered ", data)
      if (data.length <= 0){
        setPopLoading(true)
      }
      console.log("target event ", event.currentTarget)
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
      console.log("closing popover.....", anchorEl)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // handling removing alerts
    const handleRemove = async(event, data) => {
      console.log("removing data :", data)
      const response = await AlertServices.removeAlert(data);
      console.log("remove response, ", response)
      if (response.status == 202){
        Toast.fire({
          icon: 'warning',
          title: 'Alerady removed'
        })
        return
      }
      if (response.status === 200){
        
        Toast.fire({
          title: `Alert removed successfully`,
          icon: 'success',
        })
        getAlerts()
      }else{
        Toast.fire({
          title: `Error removing alert`,
          icon: 'error',})
      }

    };
    // const handleAddAlert = () => {
    //   console.log("market received ", market);
      
    //   // const response = AlertServices.addAlert(market);
    // };

    // handeling adding of alerts
    // [count, setCount] = useState(0)
    const handleSetAlert = async(e) => {
      e.preventDefault();
      console.log("data triggered ", data)
      if (data.length <= 0){
        setPopLoading(false)
      }
      console.log("going to add an alert now")
      console.log("alert set called ", state.value[0])
      const value = state.value[0]
      console.log("data : ", data)
      var flag = false
      // data.map(obj => {
      //   if (obj.crypto_name = market+'/USDT' && obj.crypto_price == value){
      //     console.log("passing...");
      //   }
      // })
      for (let obj of data){
        // let obj = data[i]
        if (obj.crypto_name = market+'/USDT' && obj.crypto_price == value){
          flag = true
          console.log("found duplicate")
          break
        }
      
      }
      if(flag){
        getAlerts()
        Toast.fire({
          title: `Alert already exists`,
          icon: 'error',
        })
        return }
      const newAlert = {crypto_name: market,
                        crypto_price: value
                      }
      // const data_ = data                
      // data_.push(newAlert)
      // setData(data_)
      const response = await AlertServices.addAlert(newAlert);
      
      getAlerts()
      console.log("alert response :", response)
      if (response.status === 200){
        Toast.fire({
          title: `Alert added successfully`,
          icon: 'success',
        })
      }else{
        Toast.fire({
          title: `Error adding alert`,
          icon: 'error',
        })
      }
    }
       
    const getAlerts = async() => {
      const response = await AlertServices.getAllAlerts();
      console.log("alerts, ",response.data)
      const rows = response.data.allalertlist
      console.log("data, ", rows)
      setData(rows)
      console.log('fectching alerts', data);
    }

    console.log("loaded alerts")
    
    // const [value, setValue] = useState(0);
    const targetPrice = {value : ''}
    const [state, setState] = useState(targetPrice)

    const handleChange = (e) => {
      console.log("float, ", parseFloat(e.target.value))
      setState({
        ...state, 
        [e.target.name] : [parseFloat(e.target.value)]
      })
    } 
    const [data, setData] = useState([]);
    const [popLoading, setPopLoading] = useState(true);
    console.log("the data", data)
    useEffect( () => {
      setTimeout(() => {
        setLoader(false)
      }, 1000);
      getAlerts();
    }, [])

    return(
    <div className='Alerts'>
      { loader ? <SimpleLoader/> :
      data?.length <= 0 ?
        <Box className="No-Alerts-Box" >
        <p>No alerts set</p>
        <AlarmAddOutlinedIcon  aria-describedby={id} className="add-alert-icon" onClick={(event)=>handleClick(event)} style={{marginTop:'20px'}}/>
        <p className='add-alert-p' style={{marginTop:'20px'}}>Click to add an alert</p>
        </Box>:
    
      <Table className="alerttable" striped bordered hover variant="dark" style={{textAlign:'center', background:'#212529'}} >
        <thead>
          <tr>
            <th>Alerts</th>
            <th >
              <AlarmAddOutlinedIcon className="add-alert-icon-second" aria-describedby={id} onClick={(event)=>handleClick(event)}/>
            </th>
          </tr>
          <tr>
            <th>Cryptocurrency</th>
            <th>Type</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        {console.log("table")}
        {console.log("the set data , ", data)}
        <tbody>
          {data?.map((data) => {
            // {console.log(data, " data")}
            return (
              <tr key={data.crypto_price}>
                <td >
                  {data.crypto_name}  
                </td>
                <td>
                  crossing
                </td>
                <td>
                  {data.crypto_price}
                </td>
                <td>
                <Button 
                startIcon={<DeleteIcon/>}
                color="primary"
                sx= {{ w:'auto', maxHeight:'5px'}}
                onClick={(event) =>{
                  //console.log("cell values", cellValues)
                  handleRemove(event, data);
                }}
                
                >
                </Button>
                </td>
                {/* <td>
                <p>{data.value}</p>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>}
      {console.log("pop loading", popLoading)}
      {popLoading &&
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        // hideBackdrop= {true}
        // style={{color:"blue"}}
      >
      
          <Form className='alertForm'>
            <Form.Group className="mb-3 pt-2" controlId="formBasicMarket">
              <p className = 'alert-form-control-disbaled' type="text" >{market}/USDT</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicValue">
              <Form.Label>Value</Form.Label>
              <Form.Control className='alert-form-control' name='value' type='number' step="0.01" min='0' placeholder="Enter Value" onChange={handleChange} required/>
            </Form.Group>
            <Button type="submit" className="alert-btn " id="alert-btn" onClick={handleSetAlert}>
              Set Alert
            </Button>
        </Form>
      </Popover>
    }
    </div>
    );
}
