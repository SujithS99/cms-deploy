import React , {useState, useEffect} from 'react'
import {Container, Row, Col, CardImg, Button, Label, Input} from 'reactstrap';
import ActiveSubsciptionModal from './ActiveSubsciptionModal';
import BlockPlayer from './BlockPlayer';
import FriendListModal from './FriendListModal';
import GrantPanelModal from './GrantPanelModal';
import TransactionHistoryModal from './TransactionHistoryModal';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import Constants from '../../lib/constant';
import UnBlockPlayerModal from './UnBlockPlayerModal';

const ButtonStyle = {
  background : "white",
  color:"black",
  borderColor:"black"
}

function UserProfile(props) {
  const [data, setData] = useState(props.data)
  const [showBtnPopup, setShowBtnPopup] = useState(false)
  const [showUnBlockPopup, setShowUnblockPopup] = useState(false)
  const [transactionHistoryPopup, setTransactionHistoryPopup] = useState(false)
  const [grantPanelPopup, setGrantPanelPopup] = useState(false)
  const [friendListPopup, setFriendListPopup] = useState(false)
  const [subscriptionPopup, setSubscriptiontPopup] = useState(false)

  // useEffect(() => {
  //   loadUsersDetail();
  // }, [props])

  const refreshData = () => {
    props.refresh();
  }

  //  const loadUsersDetail = async () => {
  //   const res = await apiClient('/adminGetUserDetail', 'GET', null, {admin_id:props.adminId, access_token:props.accessToken, other_user_id:props.userId});
  //   if (res.responseCode === Response.STATUS_OK) {
  //     setData(res.responseData);
  //   }
  // }
  
  function BlockAndUnblock() {
    if(data.status === Constants.ACTIVE_STATUS) {
      setShowBtnPopup(true)
    } else {
      setShowUnblockPopup(true)
      // updateUserStatus()
    }
  }

  const updateUserStatus = async () => {
    //making api call to update data
    let updatedData = {admin_id:props.adminId, access_token:props.accessToken, other_user_id:props.userId, status:2}
    const res = await apiClient('/adminUpdatePlayer', 'POST', updatedData);
   
    if (res.responseCode === Response.STATUS_OK) {
      // setBlocked(Constants.BLOCKED_STATUS)
      props.refresh();
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    }
  }

  return (
    <Container>
      <Row>
        <Col sm="4">
          <aside>
            <Row>
              <Col md="6">
                <CardImg  style={{borderRadius:"50%"}} src={data.profile_picture.length !== 0 ?data.profile_picture : Constants.DEFAULT_PROFILE} />
              </Col>
              <Col md="6">
                <p style={{marginTop:"30%",fontWeight:"400", fontSize:"18px", wordBreak:"break-all"}} >{data.user_name}</p>
              </Col>
            </Row>
            
             <br/> <br/>
            <Button style={ButtonStyle} block onClick={() => setTransactionHistoryPopup(true)} >Transaction History</Button> <br/>
            <Button style={ButtonStyle} block onClick={() => setGrantPanelPopup(true)} >Grant Panel</Button><br/>
            <Button style={ButtonStyle} block onClick={() => setFriendListPopup(true)}>Friend List</Button><br/>
            <Button style={ButtonStyle} block onClick={() => setSubscriptiontPopup(true)} >Active Subscription</Button><br/>
          </aside>
        </Col>
    
        <Col sm="6">
          <Container style={{background:"gray", padding:"50px", marginTop:"50px"}}>
            <Row>
              <Col sm="6">
                <Label for="chips" >Chips:</Label>
                <Input type="name" disabled value={data.chips} name="chips" /><br/>
                <Label for="pid" >PID:</Label>
                <Input type="name" disabled value={data.user_id} name="pid" />
                <br/>
                <Label for="created_at" >Created At:</Label>
                <Input type="name" disabled value={data.playing_since} name="created_at" />
              </Col>
              <Col sm="6">
                <Label for="friends" >Total Friends:</Label>
                <Input type="name" disabled value={data.total_friends} name="friends" /><br/>
                <Label for="level" >Level:</Label>
                <Input type="name" disabled value={data.level} name="level" /><br/>
              </Col>
            </Row>
          </Container>
          <br/>
          <Col sm="6" style={{float:"right"}}>
            <Button block color={data.status === Constants.ACTIVE_STATUS ? "danger" :  "success"} id="b-btn" onClick={BlockAndUnblock} >{props.data.status === Constants.ACTIVE_STATUS ? "Block player" : "Unblock player" }</Button>
          </Col>
        </Col>
      </Row>

      {/* block player modal*/}
      <BlockPlayer
        accessToken={props.accessToken}
        adminId ={props.adminId}
        userId = {props.userId}
        profilePic = {data.profile_picture.length !== 0 ? data.profile_picture : Constants.DEFAULT_PROFILE}
        userName = {data.user_name}
        chips = {data.chips}
        isOpen={showBtnPopup}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle ={() => { setShowBtnPopup(false); }}
        refresh = {refreshData}
      />

       {/* unblock player modal*/}
       <UnBlockPlayerModal
        accessToken={props.accessToken}
        adminId ={props.adminId}
        userId = {props.userId}
        profilePic = {data.profile_picture.length !== 0 ? data.profile_picture : Constants.DEFAULT_PROFILE}
        userName = {data.user_name}
        chips = {data.chips}
        isOpen={showUnBlockPopup}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle ={() => { setShowUnblockPopup(false); }}
        refresh = {refreshData}
      />

       {/*Transaction History modal*/}
       <TransactionHistoryModal
        accessToken={props.accessToken}
        adminId ={props.adminId}
        userId = {props.userId}
        profilePic = {data.profile_picture.length !== 0 ? data.profile_picture : Constants.DEFAULT_PROFILE}
        userName = {data.user_name}
        isOpen={transactionHistoryPopup}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle ={() => { setTransactionHistoryPopup(false); }}
      />

        {/*Grant panel  modal*/}
        <GrantPanelModal
        accessToken={props.accessToken}
        adminId ={props.adminId}
        userId = {props.userId}
        isOpen={grantPanelPopup}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle ={() => { setGrantPanelPopup(false); }}
        refresh = {refreshData}
         
      />

       {/*Friendlist  modal*/}
       <FriendListModal
        accessToken={props.accessToken}
        adminId ={props.adminId}
        userId = {props.userId}
        isOpen={friendListPopup}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle ={() => { setFriendListPopup(false); }}
      />

       {/*Active subscription  modal*/}
       <ActiveSubsciptionModal
        accessToken={props.accessToken}
        adminId ={props.adminId}
        userId = {props.userId}
        isOpen={subscriptionPopup}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle ={() => { setSubscriptiontPopup(false); }}
      />

    </Container>
  )
}

export default UserProfile
