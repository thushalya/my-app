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
import Swal from 'sweetalert2';
import PageLoader from '../../components/pageLoader/PageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { initWatchlist} from '../../redux/watchlist';
import { WindowSharp } from '@mui/icons-material';
import SimpleLoader from '../../components/loaders/lottieLoader/SimpleLoader';
import WatchlistLoader from '../../components/loaders/watchlistLoader/WatchlistLoader';
import NoItemsLoader from '../../components/loaders/noItemsLoader/NoItemsLoader';
import Slide from 'react-reveal/Slide';

export default function Watchlist() {
  
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [eventSources, setEventSources] = useState([])
  const [records, setRecords] = useState(new Map())
  const [removed, setRemoved] = useState(false)
  
  const dispatch = useDispatch()

  const handleDelete = async(e, id, symbol) => {
    
    setRemoved(true)
    const response = await checkMarket(symbol)
    console.log("response :", response)
    if (response.status === 200){
          Swal.fire({
            title: `${symbol}`,
            text: 'Removed from watchlist successfully',
            icon: 'success',
            background:'#111726',
            showConfirmButton: false,
            color:'white',
            timer: 1500,
          })
          dispatch(initWatchlist(response.data.data))
          setTimeout(() => {
            setLoader(false)
          }, 1500);
    }else{
        Swal.fire({
          title: `Error removing ${symbol} from watchlist`,
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok',
          background:'#111726',
          color:'white',
        })
    }
    
    console.log("hee heee")
    
    setRemoved(false)
  }
  
  const [itemArr, setItemArr] = useState([])
  const userDecode = Token.getAuth()
  const user_id = userDecode['user_id']
  const [loading, setLoading] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);

  const checkMarket = async(symbol) => {
      console.log("calling check market")
      let record_ = records
        record_.delete(symbol)
        setRecords(record_)
        setformat()
        let data_ = data
        data_ = data_.filter((item, index) => {
          return item !== symbol
        })
        console.log("data", data_)
        setRemoved(true)
        setData(data_)
      const response = await WatchlistServices.removeMarket(symbol)
      
      console.log("response in checkMarket", response)
      return response
    }
  useEffect(()=>{
    getWatchlist()

  }, []);
  const getWatchlist = async() => {
    
    
    const response = await WatchlistServices.viewWatchlist()
    if (response.status === 200){
      console.log("response get watchlist:", response)
      const data_ = response.data.data
      console.log("data of list", data_)
      if (data_.length === 0){
        setLoading2(false)
        setData([])
      }
      else{
        setData(data_)
      }
      console.log("finised loading")
    }
    setTimeout(() => {
      setLoading2(false)
    }, 4000);
    
  };
  useEffect(()=>{
    console.log(removed)
    if(removed){return}
    let watcheventSource = null
    if (data !== null) {
      console.log("data in event source", data)
      for (let i in data) {
          watcheventSource  = new EventSource( "http://127.0.0.1:5000/present/" + data[i].split('/')[0] + '/1m')
          watcheventSource.addEventListener(
            'message',
            function(e){
              let parsedData = JSON.parse(e.data)
              let object = {
                id: i,
                symbol: data[i],
                price: parseFloat(parsedData[4]).toFixed(4),
                high: parseFloat(parsedData[3]).toFixed(4),
                low: parseFloat(parsedData[2]).toFixed(4),
                volume: parseFloat(parsedData[5]).toFixed(4)
              }
              records.set(data[i], object)
              setRecords(records)
              setformat()
            }
          )
          eventSources.push(watcheventSource)
          setEventSources(eventSources)

      }
      
    }

    return async() => {
      if (eventSources.length !== 0) {
        for (let eventsource of eventSources) {
          eventsource.close()
        }
        setEventSources([])
      }
    }

  },[data])

  // useEffect(()=>{
  //     const response = WatchlistServices.removeMarket(removeMarket)
  //     console.log("response :", response) 
  // },[removeMarket])

  const setformat=()=>{
    const rows=[]
    const ids = []
    for (let [key, value] of records){
      if (ids.includes(value.id)) continue
      ids.push(value.id)
      rows.push(value)
    }
    // console.log("rows", rows)
    setRows(rows)
    setLoader(false)
  }
  const columns = [
    { field:'id', hide:true},
    { field: 'symbol', headerName: 'Symbol', width: 150, headerAlign:'center', align:'center' },
    { field: 'price', headerName: 'Price',type: 'number', width: 180, headerAlign:'center', align:'center' },
    { field: 'high', headerName: 'High', type: 'number',width: 180, headerAlign:'center', align:'center'  },
    { field: 'low', headerName: 'Low',type: 'number', width: 180, headerAlign:'center', align:'center' },
    { field: 'volume', headerName: 'Volume',type: 'number', width: 180, headerAlign:'center', align:'center' },
    {
      field: "Remove",
      sortable: false,
      filterable: false,
      renderCell : (cellValues) => {
        return (
          <Button variant="outlined"
          data-cy='test-watchlist-remove' 
          startIcon={<DeleteIcon style={{position:'relative', left:'40%'}}/>}
          color="primary"
          sx= {{pr:3, pl:3, w:'auto'}}
          onClick={(event) =>{
            console.log("cell values", cellValues)
            
            Swal.fire({
              title: 'Are you sure?',
              text: `Remove ${cellValues.row.symbol} from watchlist`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, remove it!',
              background:'#111726',
              color:'white',
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete(event, cellValues.row.id, cellValues.row.symbol);
              }
            })
          }}
          
          >
          </Button>
        );
      },
      headerAlign: 'center',
      align: 'center',
      width: 150
    }
  ];
  
  return (
    <div>
      <HeaderTwo/>

      { 
      loading2 ?
       <WatchlistLoader data-cy='watchlist-loader'/> :
      rows?.length <= 0 
      ? 
      <div >
      <h1 className='watchlist-header'>Watchlist</h1>
      <h2 className='watchlist-header2'>Your watchlist is empty</h2>
      <NoItemsLoader  />
      </div>
      :
      loader ? 
        <Loader/>
      : 
      <div className='d-flex flex-column justify-content-center'>
        <h1 data-cy='test-watchlist-h' className='watchlist-header'>Watchlist</h1>
        <Slide right>
        <Container maxWidth="lg" className='watchlist-container'>
        <div className='watchlist-datagrid'>
          {/* {console.log("rows for the data grid", rows)} */}
          <DataGrid
            rows={
            rows
            }
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableColumnFilter
            disableColumnSelector
            disableSelectionOnClick
            disableColumnMenu
            sx={{
              m:2,
              boxShadow: 2,
              border: 0,
              borderColor: 'primary.dark',
              color: 'white',
              backgroundColor: '#212529',
              marginTop: 10,
            }
          }
        />
        </div>
        </Container>
        </Slide>
      </div>}
    </div>
  )
}

