import "./AllUsers.css";
// import HeaderTwo from "../../components/headers/HeaderTwo";
import Searchbar from "../../components/Searchbar/Searchbar.tsx";
import { Card, Form, Button, Table, FormControl, InputGroup, DropdownButton, Dropdown, Pagination, } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminServices from "../../services/API/AdminServices";
import UserServices from "../../services/API/UserServices";
import Paginate from "../../components/pagination/paginate.tsx";
// import { toast } from 'react-toastify';
// import Loader from "../../components/loader/Loader";
// import Messages from "../../helpers/Messages";
import { Link } from "react-router-dom";
// import 'font-awesome/css/font-awesome.css';

import Token from "../../services/Token";
import HeaderTwo from "../../components/headers/HeaderTwo";
import FilterListIcon from '@mui/icons-material/FilterList';
import Swal from "sweetalert2";
import WatchlistLoader from "../../components/loaders/watchlistLoader/WatchlistLoader";

const AllUsers = () => {  // For the admin to view all users

  //For Pagination
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const [loader, setLoader] = useState(true);

  const changePage = async (skip_value) => {  // For pagination
    
    if (filterBy === "") {  // If no filter is applied
        getUsers(skip_value, take, search, filterBy);
    } else {  // If filter is applied
        getUsers(skip_value, -1, search, filterBy);
    }
  }

  

  // When activate/deactivate is clicked
  const changeActivation = async (user_id) => {
    try {
      const response = await UserServices.changeActivation( {user_id} );
      if (response.status === 200) {  // If successful
        Toast.fire({
          icon: "success",
          title: "Changed activation successfully",
        });
        
        getUsers(skip, take, search, filterBy); // Refresh the page
        
      }
    } catch (error) {
     
  }
  };

  const Toast = Swal.mixin({  // For the toast
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

  // Search term
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const searchUser = () => {
    console.log("searching by", search, filterBy);
    if (search === "") {
      Toast.fire({
        icon: 'error',
        title: 'Enter a search term',
        showConfirmButton: false,
        timer: 1500
      })
    }
    
    filterBy === "" && setFilterBy("firstName") // If no filter is applied, filter by first name
    getUsers(0, -1, search, filterBy);
  }

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getUsers( skip, take, search, "");
  }, []);

  const getUsers = async ( skip_value, take, search, filter) => { // Get all users
    
    setTimeout(() => {
      setLoader(false);
    }, 1800);
    try {
      let response = null;
      response = await AdminServices.getUsers(skip_value, take, search, filter);
      
      setSearch(search);
      setSkip(skip_value);
      setUsers(response.data.data.users);
      setTotalItems(response.data.data.usercount);  // For pagination
    } catch (error) {
      console.log(error)
      
    }
    
  };

  const filterFunc = (filter) => {
    setFilterBy(filter);
   
  }
    return (
      <div className="all_users">
        <HeaderTwo/>
        {loader ?
        <WatchlistLoader />
        :
        <div className="all_users_container">
        <h1 className="alluser_header" style={{marginTop:"50px", paddingBottom:'40px'}}>All Users</h1>

        <div className="container users">


         
          <div className="flex-parent">
          <div data-testid='filter-btn' className="filter display-flex">
            <DropdownButton id="dropdown-basic-button" title="Filter By">
                <Dropdown.Item onClick={()=>filterFunc('firstName')}>First Name</Dropdown.Item>
                <Dropdown.Item onClick={()=>filterFunc('lastName')}>Last Name</Dropdown.Item>
                <Dropdown.Item onClick={()=>filterFunc('email')}>Email</Dropdown.Item>
                <Dropdown.Item onClick={()=>filterFunc('country')}>Country</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="search display-fixed" style={{marginLeft:'5px'}}>
            <Button data-testid='search-btn' variant="outline-primary" onClick={() => searchUser()} style={{ borderRadius: "20px", float: "right" }}>Go</Button>
            
            <input
              type="search"
              placeholder={"   Search " }
              className="me-2 search-bar"
              aria-label="Search"
              onChange={(event) => setSearch(event.target.value)}
              value={search}
              
            />
          </div>
          </div>

          <div className="user_display" style={{marginTop:"10px"}}>
            {users.length === 0 &&
              <div>
                
                <h1 align='center' style={{ color:'white', size:'50px',marginTop:"10%"}}>No Users Found</h1>
              </div>}
            {users.length !== 0 &&
              <Table data-testid='test-table' style={{ color: "#1376BD", width: "100%" }}>
                <thead>
                  <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Birthday</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody style={{ color: "white" }}>
                  {users.map((value, key) => {
                   
                    return (
                      <tr key={key}>
                        <td>
                          {parseInt(value.active) ? <i className="fa fa-check-square" aria-hidden="true" style={{color: "green"}}/> : <i className="fa fa-power-off" aria-hidden="true" style={{margin: "5px", color: "crimson"}}/>}
                          <i className=""></i>
                        </td>
                       
                        <td>{value.firstname}</td>
                        <td>{value.lastname}</td>
                        
                        <td>{value['email']}</td>
                        <td>{value['dob'] && value['dob'].slice(0, 10)}</td>
                        <td>{value['country']}</td>
                        <td>
                          
                        </td>
                        <td>
                          
                          {parseInt(value.active) ? (
                            <Button
                              variant="outline-danger"
                              className=""
                              style={{ borderRadius: "20px" }}
                              onClick={() => changeActivation(value['_id'])}
                            >
                              <i className="fa fa-power-off" aria-hidden="true" style={{margin: "5px"}}></i>Deactivate
                            </Button>
                          ) : (
                            <Button
                              variant="outline-success"
                              className=""
                              style={{ borderRadius: "20px" }}
                              onClick={() => changeActivation(value['_id'])}
                            >
                              <i className="fa fa-check-square" aria-hidden="true" style={{margin: "5px"}}/>Activate
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>}

            <div className="container paginate_div text-center">
             
              <Paginate
                skip={skip}
                take={take}
                setSkip={changePage}
                totalItems={totalItems}
              />
            </div>
          </div>

        </div>
      </div>
        }
      </div>
    );
};

export default AllUsers;
