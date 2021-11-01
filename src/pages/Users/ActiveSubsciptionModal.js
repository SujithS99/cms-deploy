import React, {useState} from 'react'
import { Modal , ModalHeader, ModalBody, Row, Col, Card, CardTitle} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import Response from '../../lib/Response';

function ActiveSubsciptionModal(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState([])

  const heightCheck = event => {
    event.preventDefault();
    //loading data if screen size is big
    if (window.outerHeight > 1000 && subscriptionData.length < 20 && loadMoreData && !inProgress) {
      loadUserSubscription(false);
    }
  };

  const loadUserSubscription = async (reset) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);
    const params = {admin_id:props.adminId, access_token:props.accessToken, other_user_id:props.userId}
    const res = await apiClient('/adminGetUserSubscription', 'GET', null, params);
  
    if (res.responseCode === Response.STATUS_OK) {     
      setSubscriptionData(res.responseData.subscriptions);
      if (res.responseData.subscriptions.length === 0) setLoadMoreData(false);
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
      onLoad={heightCheck}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader toggle={props.toggle}>
        <span style={{fontSize:'40px'}}>ACTIVE SUBSCRIPTION</span>
      </ModalHeader>
      <ModalBody>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Try Refreshing.</h1>}
        {!error && subscriptionData.length === 0 && ((!inProgress && loadUserSubscription(true) && false) || (!loading && (!loadMoreData ? 
          <p className='text-center'>No Subscriptions are currently active for this user</p> : 
          <h1>Loading...</h1>)))}
      
        {subscriptionData.length !== 0 && 
         <div>
          {subscriptionData.map(({name,status,price, duration, start_date, end_date }, index) => (
            <Card key={index} style={{marginTop:"15px"}}>
              <Row>
              <Col sm="6" className="text-center pb-6 pt-2">
                <CardTitle>Subscription Name:{name}</CardTitle> <br/>
                <CardTitle>Package Name:{price}</CardTitle> <br/>
                <CardTitle>Status:{status===Constants.ACTIVE_SUBSCRIPTION ? Constants.ACTIVE_SUBSCRIPTION_TXT: ''}</CardTitle> <br/>
              </Col>
              
              <Col sm="6" className="text-center pb-6  pt-2 ">
                <CardTitle>Package Duration:{duration}</CardTitle><br/>
                <CardTitle>Activation:{start_date}</CardTitle><br/>
                <CardTitle>Active Till:{end_date}</CardTitle><br/>
              </Col>
              </Row>
            </Card>
          ))}
          </div>
        }
      </ModalBody>
    </Modal> 
  )
}

export default ActiveSubsciptionModal
