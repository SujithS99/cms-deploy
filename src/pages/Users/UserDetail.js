import React , {useState} from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import UserProfile from './UserProfile';
import PlayerDetail from './PlayerDetail';
import Response from "../../lib/Response";
import apiClient from '../../lib/apiClient';

function UserDetail(props) {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [initialLoad, setSetInitialLoad] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  let history = useHistory();
  let { userId } = useParams();

  //function to toggle b/n tabs
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  
  //api call to get user detail for user id
  const loadUsersDetail = async (reset) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);

    if (props.routeBreadCrumbs.length === 0 ) return history.push('/user_list');
  
    const res = await apiClient('/adminGetUserDetail', 'GET', null, {admin_id:props.adminId, access_token:props.accessToken, other_user_id:userId}, props.accessToken);

    if (res.responseCode === Response.STATUS_OK) {
      setUser(res.responseData);
      if (res.responseData.length === 0) setLoadMoreData(false);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }

    setInProgress(false);
    setLoading(false);
  }

  return (
    <div>
      <Row>
      <Col md={1}></Col>
      <Col xl={10} lg={12} md={12}>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            <h4 style={{color: "black", 'fontWeight': '400'}}>Edit Profile</h4>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            <h4 style={{color: "black", 'fontWeight': '400'}}>Player Details</h4>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <br/>
        <TabPane tabId="1">
        <div className="d-flex flex-column align-items-center">
          {loading && user.length === 0 && <h1>Loading...</h1>}
          {error && <h1>Error. Try Refreshing.</h1>}
          {!error && user.length === 0 && ((!inProgress && initialLoad && loadUsersDetail(true) && false) || (!loading && ((loadMoreData && initialLoad ) ? <h1>Loading...</h1> : <h1>No Data found</h1>)))}
         
          {user.length !== 0 && 
          <UserProfile
            data={user}
            userId = {userId}
            routebreadcrumbs={props.routeBreadCrumbs}
            setroutebreadcrumbs={props.setRouteBreadCrumbs}
            resetaccesstoken={props.resetAccessToken}
            accessToken={props.accessToken}
            adminId ={props.adminId}
            refresh = {() => {setUser([]); loadUsersDetail(true) }}
           
          />
        }
          </div>
        </TabPane>

        <TabPane tabId="2">
          <PlayerDetail
            userId = {userId}
            data={user}
            routebreadcrumbs={props.routeBreadCrumbs}
            setroutebreadcrumbs={props.setRouteBreadCrumbs}
            resetaccesstoken={props.resetAccessToken}
            accessToken={props.accessToken}
            adminId ={props.adminId}
          />
        </TabPane>
      </TabContent>
      </Col>
      <Col md={1}></Col>
      </Row>
    </div>
  )
}

export default UserDetail
