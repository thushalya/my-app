import React, { useState, useEffect } from "react";
import "../../assets/css/Notifications.css"
import { autocompleteClasses, Container } from '@mui/material';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NotificationServices from "../../services/NotificationServices";
import { Fragment } from "react";
import Token from "../../services/Token";
import { useDispatch, useSelector } from "react-redux";
import { decrement, setCount } from "../../redux/notification";
import SimpleLoader from "../../components/loaders/lottieLoader/simpleLoader";

// TODO: 
// 1. css fix
// 2. Loader

export default function Notifications(){
  // for no new notification alert
    const [open_, setOpen_] = useState(true);
    const handleOpen_ = () => setOpen_(true);
    // let {count} = useSelector(state => state.notification)
    const dispatch = useDispatch()
    const handleClose_ = (event, reason) => {
      if (reason == 'clickaway'){
        return;
      }
      setOpen_(false);
      return
    };
    const callHistoricNotifications = async() => {
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
      }, 1000);
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
      console.log("rows", rows_)
      // console.log("rows", rows?.data['last day notifications'])
      setData(rows_)
      console.log("data  notifications:", rows)
      console.log("length of data", rows?.data['last day notifications'].length)
      dispatch(setCount(rows?.data['last day notifications'].length))
    };
    useEffect(()=>{
      callHistoricNotifications();
      // let eventSource = new EventSource(
      //   `${config.DOMAIN_NAME}/notifications/present`,
      //   {headers: { Authorization: `Bearer ${Token.getAccessToken()}` }}
      // );
      // eventSource.addEventListener(
      //   "message",
      //   function (e) {
      //     let parsedData = JSON.parse(e.data);
      //     console.log("parsedData", parsedData)
      //     // let object = {
      //     //   time: parsedData[0],
            
      //     // };
      //     // candleSeries.current.update(object);
      //   }
      // );
    }, [])
    
    

    const action = (
      <Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose_}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Fragment>
    );
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const handleMark = async(e, id, symbol, price) => {
        const data_ = {'symbol': symbol.split("/")[0], 'price': price}
        console.log("data_", data_)
        const response = await NotificationServices.readNotification(data_);
        console.log("response for reading notification", response)
        if (response.data == 'success'){
          setData(data.filter(item => item.id !== id))
          dispatch(decrement())
        }
    }
    const handleMarkAll = async(e) => {
      const response = await NotificationServices.readAllNotifications();
      console.log("response for reading all notifications", response)
      if (response.data == 'success'){
        setData([])
        dispatch(setCount(0))
      }
    }
    const columns = [
        { field:'id', hide:true},
        { field: 'date', headerName: 'Date', width: 175, headerAlign:'center', align:'center', sortable:true },
        { field: 'symbol', headerName: 'Symbol', width: 100, headerAlign:'center', align:'center', sortable:false },
        { field: 'type', headerName: 'Type', width: 200, headerAlign:'center', align:'center', sortable:false },
        { field: 'price', headerName: 'Price',type: 'number', width: 120, headerAlign:'center', align:'center', sortable:false },
        
        // { field: 'current peak price', headerName: 'Current Peak',type: 'number', width: 120, headerAlign:'center', align:'center', sortable:false },
        {
          field: "Mark As Read",
          sortable: false,
          filterable: false,
          renderCell : (cellValues) => {
            return (
              // <Button variant="outlined" 
              // startIcon={<DeleteIcon style={{position:'relative', left:'40%'}}/>}
              // color="primary"
              // sx= {{pr:3, pl:3, w:'auto'}}
              // onClick={(event) =>{
              //   handleDelete(event, cellValues.id);
              // }}
              //   Mark As Read
              // >
              // </Button>
              <Button variant="outlined" 
              startIcon={<CheckIcon style={{position:'relative', left:'40%'}}/>}
              color="primary"
              sx= {{pr:3, pl:3, w:'auto'}}
              onClick={(event) =>{
                console.log("cellValues", cellValues)
                handleMark(event, cellValues.id, cellValues.row.symbol, cellValues.row.price);
                // handleMarkAll(event);
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
          <Snackbar
            sx={{position:'absolute'}}
            open={open_}
            autoHideDuration={6000}
            onClose={handleClose_}
            message="No new notifications"
            action={action}
            anchorOrigin={{ vertical:'top',  horizontal:'center'}}
          />
        : 
        <Container maxWidth="sm" sx={{boarder:0}}>
        <div style={{ height: 400, width: '100%'}}>
          
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
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
    );
}

// export default NotificationModal;
