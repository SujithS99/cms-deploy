import React, {useState, useEffect} from 'react'
import { MdSearch } from 'react-icons/md';
import Select from 'react-select';
import { Container, Button, Input } from 'reactstrap';
import UserCard from './UserCard';
import UserSearch from './UserSearch';
import Response from "../../lib/Response";
import apiClient from '../../lib/apiClient';
import DeleteUserModal from './DeleteUserModal';
import Constants from '../../lib/constant';
import UserSearchWithPlayerName from './UserSearchWithPlayerName';

const buttonStyle = {
  background:"white", 
  color:"black",
  borderColor:"black",
  fontWeight:"bold"
}

function UserList(props) {
  const [userData, setUserData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [lastIndex, setLastIndex] = useState(0)
  const [defaultFilter, setDefaultFilter] = useState('');
  const [userDeletePopup, setUserDeletePopup] = useState(false);
  const [userDeleteData, setUserDeleteData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [showPlayerSearchInput, setShowPlayerSearchInput] = useState(false);

  const [filterDropdown] = useState([
    {value:0, label:'All Users'},
    {value:1, label:'Active Users'},
    {value:2, label:'Blocked Users'}
  ])
  const [userSearchPopup, setUserSearchPopup] = useState(false);


  //list users
  const loadUsersList = async (reset) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);
    let params = {admin_id:props.adminId, access_token:props.accessToken,filter:defaultFilter,last_user_id: reset ? 0 : lastIndex, limit:10} ;
    if (searchText !== '' && typeof searchText !== "undefined") params.search_text = searchText;

    const res = await apiClient('/adminGetUsersList', 'GET', null, params);
    console.log(res.responseData.users);
    if (res.responseCode === Response.STATUS_OK) {  
      reset ? setUserData([...res.responseData.users]) : setUserData([...userData, ...res.responseData.users]);
      setTotalUsers(res.responseData.total_users); 
      if (!res.responseData.users || res.responseData.total_users < 10 || res.responseData.users.length === 0) setLoadMoreData(false);
      else setLastIndex(res.responseData.last_user_id);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setInProgress(false);
    setLoading(false);
  }

  const loadPageOnSearch = (data) => {
    if(data.length === 0) { 
      setLoadMoreData(false); 
      setUserData([]); 
      setTotalUsers('0'); 
     } else {
      setLoadMoreData(false); 
      setUserData(data); 
      setTotalUsers(data.length);
     }
  }

  useEffect(() => {
    props.setRouteBreadCrumbs([{route: '/user_list', title: 'User Management'}]);
  }, [])

  useEffect(() => {
    setDefaultFilter(defaultFilter)
    setUserData([]);
    setLoadMoreData(true)
    setInProgress(false)
    loadUsersList(true)
  }, [defaultFilter])

  const heightCheck = event => {
    event.preventDefault();
    //loading data if screen size is big
    if (window.outerHeight > 1000 && userData.length <10 && loadMoreData && !inProgress) {
      loadUsersList(false);
    }
  };

  const scrollCheck = event => {
    if (!event.target.scrollTop) return;

    const bottom = (Math.floor(event.target.scrollHeight - event.target.scrollTop) === (event.target.clientHeight-1)) || (Math.floor(event.target.scrollHeight - event.target.scrollTop) === (event.target.clientHeight));
    if (bottom) {
      loadUsersList(false);
    }
  };

  const deleteUser = (data) => {
    setUserDeleteData(data);
    setUserDeletePopup(true);
  }

  //loadUsersList function will be called whenever searchText is updated
  useEffect(() => {
    loadUsersList(true);
  }, [searchText]);

  //load list on param change in search bar
  function handleParamChange(e) {
    e.preventDefault();
    setLoadMoreData(true);
    const value = e.target.value;
    setSearchText(value);
  }

  function handleToggleSearchBar(e) {
    e.preventDefault();
    setLoadMoreData(true);
    setSearchText("");
    setShowPlayerSearchInput(false)
  }

  return (
    <Container  onScroll={scrollCheck} onLoad={heightCheck} >
    <h1 className='text-center'>User Management</h1><br/>
    <div>
      <div style={{float:"left"}}>
        <span><b><i>Total Users:</i></b></span><br/>
        <span><b><i>{totalUsers}</i></b></span>
      </div>
    
      <div style={{float:"right"}}>
        <Select
         defaultValue={defaultFilter}
         name="filter"
         options={filterDropdown}
         onChange={(e) => {setDefaultFilter(e.value); setShowPlayerSearchInput(true);}}
         classNamePrefix="select"
         placeholder="&#xf1de;Filter"
         styles={{ control: provided => ({ ...provided, "minWidth": 228, margin: 0})}}
         style={{fontFamily:"Arial,FontAwesome"}}
         isSearchable = {false}
        />
      </div>
    </div>

    <div style={{textAlign:"center"}}>
      {showPlayerSearchInput && 
        <UserSearchWithPlayerName
          onParamChange={handleParamChange}
          toggleSearchBar={handleToggleSearchBar}
        />
      }
      {!showPlayerSearchInput && 
        <Button style={buttonStyle} size="lg" onClick={() => {setUserSearchPopup(true)}} >Player Search <MdSearch style={{fontSize:"30px"}} /></Button>
      }
      </div>
    <br/>

    <div className="d-flex flex-column align-items-center" style={{'overflowX': 'scroll','position': 'relative', 'height':'700px'}}>
      {loading && <h1>Loading...</h1>}
      {error && <h1 >Error. Try Refreshing.</h1>}
      {!error && userData.length === 0 && ((!inProgress && loadUsersList(true) && false) || (!loading && (!loadMoreData ? <h1>No Data found</h1> : <h1>Loading...</h1>)))}
     
      {userData.length !== 0 && 
      <UserCard
        data={userData.map(data => {
          return {
            user_id:data.user_id,
            profile_picture: data.profile_picture && data.profile_picture.length !== 0 ? data.profile_picture : Constants.DEFAULT_PROFILE,
            user_name: data.user_name,
            chips: data.chips,
            status: data.status,
            handleDelete: deleteUser
          }
        })}

        routebreadcrumbs={props.routeBreadCrumbs}
        setroutebreadcrumbs={props.setRouteBreadCrumbs}
        resetaccessToken={() => {props.resetAccessToken()}}
        accessToken={props.accessToken}
        adminId ={props.adminId}
      
       
      />
    }
     {userData.length !== 0 && loadMoreData && (
          <div className="loading">
            <p>Loading More....</p>
          </div>
        )}
    </div>
   

    <UserSearch 
     accessToken={props.accessToken}
     adminId ={props.adminId}
     isOpen={userSearchPopup}
     resetAccessToken={() => {props.resetAccessToken()}}
     toggle={() => { setUserSearchPopup(false); }}
     refresh = {loadPageOnSearch}
     
    />

    {/* Model to show warning about deleting user */}
    <DeleteUserModal
      accessToken={props.accessToken}
      adminId ={props.adminId}
      userDetail = {userDeleteData}
      isOpen={userDeletePopup}
      toggle={() => { setUserDeletePopup(false); }}
      refresh = {() => {
        setLoadMoreData(true); 
        setUserData([]);
        loadUsersList(false) 
       }}
    />
  </Container>
  )
}

export default UserList
