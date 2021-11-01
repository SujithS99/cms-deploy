import React, {useState} from 'react'
import { Button, Container } from 'reactstrap';
import SubscriptionCreate from './SubscriptionCreate';
import SubscriptionStatusModal from './SubscriptionStatusModal';
import SubscriptionTable from './SubscriptionTable';
import SUbscriptionUpdate from './SUbscriptionUpdate';
import Response from "../../lib/Response";
import apiClient from '../../lib/apiClient';

function SubscriptionList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [totalSubscribers, setTotalSubscribers] = useState('0')
  const [percentageSubscriber, setPercentageSubscriber] = useState('0')
  const [editPopup, setEditPopup] = useState(false)
  const [subscriptionData, setSubscriptionData] = useState({})
  const [editStatusPopup, setEditStatusPopup] = useState(false)
  const [statusData, setStatusData] = useState({})
  const [addSubscriptionPopup, setAddSubscriptionPopup] = useState(false)

  const heightCheck = event => {
    event.preventDefault();
    //loading data if screen size is big
    if (window.outerHeight > 1000 && data.length < 20 && loadMoreData && !inProgress) {
      loadSubscriptionList(false);
    }
  };

  const loadSubscriptionList = async (reset) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);

    //handling dynamic breadcrumbs
    const res = await apiClient('/adminGetSubscriptionList', 'GET', null, {admin_id:props.adminId, access_token:props.accessToken});
    
    if (res.responseCode === Response.STATUS_OK) {  
      setData(res.responseData.subscriptions);
      setTotalSubscribers(res.responseData.total_subscribers)
      setPercentageSubscriber(res.responseData.percentage_subscribers)
      if (res.responseData.subscriptions.length === 0) setLoadMoreData(false);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setInProgress(false);
    setLoading(false);
  }

  const handleClickEdit = (data) => {
    setSubscriptionData(data)
    setEditPopup(true);
  };

  const handleClickStatus = (data) => {
    setStatusData(data);
    setEditStatusPopup(true);
  };


  React.useEffect(() => {
    props.setRouteBreadCrumbs([{route: '/subscription_list', title: 'Subscription Management'}]);
  }, [])

  return (
    <Container  onLoad={heightCheck}  >
      <h1 className='text-center'>Subscription Management</h1><br/>
      <div style={{float:"left"}}>
        <Button size="md" onClick={() => setAddSubscriptionPopup(true)} style={{borderColor:"black", color:"black", background:"white", textTransform:"uppercase"}} >+ Add Subscription</Button>
      </div>
      <div style={{float:"right"}}>
        <span><b><i>Total no. of Subscribers: {totalSubscribers}</i></b></span><br/>
        <span><b><i>Percentage of Subscribers: {percentageSubscriber}</i></b></span>
      </div>


      {loading && <h1 className='text-center'>Loading...</h1>}
      {error && <h1 className='text-center'>Error. Try Refreshing.</h1>}
      {!error && data.length === 0 && ((!inProgress && loadSubscriptionList(true) && false) || (!loading && (!loadMoreData ? <h1 className='text-center'>No Data found</h1> : <h1 className='text-center'>Loading...</h1>)))}
     
      {data.length !== 0 && 
        <SubscriptionTable 
          data={data.map(item => {
            return {
              subscription_id:item.subscription_id,
              name: item.name,
              users: item.users,
              status: item.status,
              product_id: item.product_id,
              duration: item.duration
            }
          })} 
          routebreadcrumbs={props.routeBreadCrumbs}
          setroutebreadcrumbs={props.setRouteBreadCrumbs}
          resetaccessToken={() => {props.resetAccessToken()}}
          accessToken={props.accessToken}
          adminId ={props.adminId}
          onClickEdit = {handleClickEdit}
          onClickStatus = {handleClickStatus}
        /> 
      }
      {/* Model to update existing subscription */}
      <SUbscriptionUpdate
        accessToken={props.accessToken}
        adminId ={props.adminId}
        isOpen={editPopup}
        data={subscriptionData}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle={() => { setEditPopup(false); }}
        refresh = {() => {setData([]); setLoading(true)}}
      />

      <SubscriptionStatusModal
        accessToken={props.accessToken}
        adminId ={props.adminId}
        isOpen={editStatusPopup}
        statusData={statusData}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle={() => { setEditStatusPopup(false); }}
        refresh = {() => {setData([]); setLoading(true)}}
      />

      <SubscriptionCreate
        accessToken = {props.accessToken}
        adminId ={props.adminId}
        isOpen = {addSubscriptionPopup}
        resetAccessToken = {() => {props.resetAccessToken()}}
        toggle = {() => {setAddSubscriptionPopup(false)}}
        refresh = {() => {setData([]); setLoading(true)}}
      />

    </Container>
  )
}

export default SubscriptionList
