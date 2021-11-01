import React, {useState} from 'react'
import { Modal , ModalHeader, ModalBody, Row, Col,Card, CardTitle} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';

function FriendListModal(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [friendsData, setFriendsData] = useState([])
  const [lastIndex, setLastIndex] = useState(0)

  const heightCheck = event => {
    event.preventDefault();
    //loading data if screen size is big
    if (window.outerHeight > 500 && friendsData.length < 10 && loadMoreData && !inProgress) {
      loadFriendsList(false);
    }
  };

  const scrollCheck = event => {
    if (!event.target.scrollTop) return;

    const bottom = (Math.floor(event.target.scrollHeight - event.target.scrollTop) === (event.target.clientHeight-1)) || (Math.floor(event.target.scrollHeight - event.target.scrollTop) === (event.target.clientHeight));
    if (bottom) {
      loadFriendsList(false);
    }
  };


  const loadFriendsList = async (reset) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);
    const params = {admin_id:props.adminId, access_token:props.accessToken, other_user_id:props.userId,last_friend_id: reset ? 0 : lastIndex, limit:10}
    const res = await apiClient('/adminGetFriendList', 'GET', null, params);
    
    if (res.responseCode === Response.STATUS_OK) {   
      reset ? setFriendsData([...res.responseData.friend_list]) : setFriendsData([...friendsData, ...res.responseData.friend_list]);
      if (!res.responseData.friend_list || res.responseData.friend_list.length === 0 || res.responseData.friend_list.length < 10) setLoadMoreData(false);
      else setLastIndex(res.responseData.last_friend_id);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setInProgress(false);
    setLoading(false);
  }


  return (
    <Modal
    isOpen={props.isOpen}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <ModalHeader toggle={props.toggle}>
        <span style={{fontSize:'40px'}}>FRIEND LIST</span>
      </ModalHeader>
      <ModalBody  onScroll={scrollCheck} onLoad={heightCheck} >
      <div className="align-items-center text-center" style={{'overflowY':'scroll', 'position': 'relative', 'height':'50vh'}}>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Try Refreshing.</h1>}
        {!error && friendsData.length === 0 && ((!inProgress && loadFriendsList(true) && false) || (!loading && (!loadMoreData ? <h1>No Data found</h1> : <h1>Loading...</h1>)))}
      
        {friendsData.length !== 0 && 
          <div>
            {friendsData.map(({user_name, user_id}, index) => 
              <Card key={index} style={{marginTop:"15px"}}>
                <Row>
                <Col sm="6" className="text-center pb-6 pt-2">
                  <CardTitle>Player Name:<br/>{user_name}</CardTitle> 
                </Col>
                <Col sm="6" className="text-center pb-6  pt-2 ">
                <CardTitle>PID:<br/> {user_id}</CardTitle>
                </Col>
                </Row>
              </Card>
            )}
          </div>
        }
        {friendsData.length !== 0 && loadMoreData && (
          <div className="loading">
            <p>Loading More....</p>
          </div>
        )}

      </div>
     
      </ModalBody>
    </Modal> 
  )
}

export default FriendListModal
