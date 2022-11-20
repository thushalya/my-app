import React, { useState, useEffect } from "react";
import "../../assets/css/Notifications.css"
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import NotificationServices from "../../services/NotificationServices";
import { Fragment } from "react";
import { useDispatch} from "react-redux";
import { decrement, setCount } from "../../redux/notification";
import SimpleLoader from "../../components/loaders/lottieLoader/SimpleLoader"
import Slide from 'react-reveal/Slide';


// notification component
export default function Notifications(){

  // for no new notification alert
    const [open_, setOpen_] = useState(true);
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const dispatch = useDispatch()  // for redux

    // for closing no new notification alert
    const handleClose_ = (event, reason) => {
      if (reason == 'clickaway'){
        return;
      }
      setOpen_(false);
      return
    };

    // getting all historical notifications
    const callHistoricNotifications = async() => {
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
      }, 1500);
      const rows = await NotificationServices.getNotifications();
      const rows_ = rows?.data['last day notifications'].map((row, index) => {
        return {
          id: index,
          date:  " " + new Date(row[0]).getDate() + "/" + new Date(row[0]).getMonth() + "/" + new Date(row[0]).getFullYear() + " " + new Date(row[0]).getHours() + ":" + new Date(row[0]).getMinutes() + ":" + new Date(row[0]).getSeconds(),
          symbol: row[1],
          price: row[2],
          type: 'crossing',
        }
      
      })
      setData(rows_)
      dispatch(setCount(rows?.data['last day notifications'].length)) // for redux
    };

    // getting all new notifications
    useEffect(()=>{
      callHistoricNotifications();
    }, [])
    
    

    const action = (
      <Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose_}
        >
        </IconButton>
      </Fragment>
    );

    // for reading a notification
    const handleMark = async(e, id, symbol, price) => {
        const data_ = {'symbol': symbol.split("/")[0], 'price': price}
        const response = await NotificationServices.readNotification(data_);
        if (response.data == 'success'){
          setData(data.filter(item => item.id !== id))
          dispatch(decrement())
        }
    }

    // for reading all notifications
    const handleMarkAll = async(e) => {
      const response = await NotificationServices.readAllNotifications();
      if (response.data == 'success'){
        setData([])
        dispatch(setCount(0))
      }
    }

    const columns = [
        { field:'id', hide:true},
        { field: 'date', headerName: 'Date', width: 200, headerAlign:'center', align:'center', sortable:true },
        { field: 'symbol', headerName: 'Symbol', width: 100, headerAlign:'center', align:'center', sortable:true },
        { field: 'type', headerName: 'Type', width: 120, headerAlign:'center', align:'center', sortable:false },
        { field: 'price', headerName: 'Price',type: 'number', width: 120, headerAlign:'center', align:'center', sortable:true },
        {
          field: "Mark As Read",
          sortable: false,
          filterable: false,
          renderCell : (cellValues) => {
            return (
              <Button variant="outlined" 
              data-cy='test-mark-read'
              startIcon={<CheckIcon style={{position:'relative', left:'40%'}}/>}
              color="primary"
              sx= {{pr:3, pl:3, w:'auto'}}
              onClick={(event) =>{
                handleMark(event, cellValues.id, cellValues.row.symbol, cellValues.row.price);
              }}
              >
              </Button>
            );
          },
          headerAlign: 'center',
          align: 'center',
          width: 120
        }
    ];
    return (
        loader ? <SimpleLoader/> 
        :
        data && data?.length <= 0
        ? 
        <Slide right>
          <Snackbar
            className="snackbar-alert"
            sx={{position:'absolute'}}
            open={open_}
            autoHideDuration={6000}
            onClose={handleClose_}
            message="No new notifications"
            action={action}
            anchorOrigin={{ vertical:'top',  horizontal:'center'}}
          />
          </Slide>
        : 
        <Slide right>
        <Container maxWidth="sm" sx={{boarder:0, maxWidth:800}}>
        <div data-cy='test-notification' className='notification-div'>
          
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
            disableSelectionOnClick
            sx={{
              m:2,
              boxShadow: 0,
              border: 0,
              borderColor: 'primary.dark',
              color: 'white',
              backgroundColor: '#212529'
            }
          }
          />
          </div>
          </Container>
          </Slide>
    );
}

