import React, { Component } from 'react'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import '../../assets/css/watchlist.css'
import { Table } from 'react-bootstrap'
import AlertServices from '../../services/AlertServices';
import AlarmAddOutlinedIcon from '@mui/icons-material/AlarmAddOutlined';
import Popover from '@mui/material/Popover';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { Box } from '@mui/system';
import SimpleLoader from '../../components/loaders/lottieLoader/SimpleLoader';


// alert component
export default function Alert({market}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [loader, setLoader] = useState(true);
    const targetPrice = {value : ''}
    const [state, setState] = useState(targetPrice)
    const [data, setData] = useState([]);
    const [popLoading, setPopLoading] = useState(true);

    // sweet alert
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
    
    // handling popover click
    const handleClick = (event) => {  
      
      if (!popLoading && data.length > 0){
        setPopLoading(true)
      }
      if (data.length <= 0){
        setPopLoading(true)
      }
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // handling removing alerts
    const handleRemove = async(event, data) => {
      const response = await AlertServices.removeAlert(data);
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

    // handling adding alerts
    const handleSetAlert = async(e) => {
      e.preventDefault();
      if (data.length <= 0){
        setPopLoading(false)
      }
      const value = state.value[0]
      var flag = false
      for (let obj of data){
        if (obj.crypto_name = market+'/USDT' && obj.crypto_price == value){
          flag = true
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
      const newAlert = {crypto_name: market,  // new alert object
                        crypto_price: value
                      }
      const response = await AlertServices.addAlert(newAlert);
      
      getAlerts()
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
       
    // get all alerts from db
    const getAlerts = async() => {
      const response = await AlertServices.getAllAlerts();
      const rows = response.data.allalertlist
      setData(rows)
    }

    
    const handleChange = (e) => {
      setState({
        ...state, 
        [e.target.name] : [parseFloat(e.target.value)]
      })
    } 

    // get all alerts on load
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
    
      <Table data-cy='test-alert' className="alerttable" striped bordered hover variant="dark" style={{textAlign:'center', background:'#212529'}} >
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
        <tbody>
          {data?.map((data) => {
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
                  handleRemove(event, data);
                }}
                
                >
                </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>}
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
