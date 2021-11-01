import React,{useState} from 'react'
import { Container} from 'reactstrap'
import Response from "../../lib/Response";
import apiClient from '../../lib/apiClient';
import BotManageTable from './BotManageTable';

function BotManage(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [data, setData] = useState([]);

  
  const getAdminGetBotWinningPercentage = async () => {
    setInProgress(true);
    setLoading(true);
    const res = await apiClient('/adminConfigGet', 'GET', null, {admin_id:props.adminId, access_token:props.accessToken});
    console.log(res);
    if (res.responseCode === Response.STATUS_OK) {  
      setData(res.responseData.bot_winning_percentage);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setInProgress(false);
    setLoading(false);
  }


  React.useEffect(() => {
    getAdminGetBotWinningPercentage();
    props.setRouteBreadCrumbs([{route: '/bot_manage', title: 'Gameplay Bot Manage'}]);
  }, [])

  return (
    <Container>
      <h1 className='text-center'>WINNING PROBABILITY</h1><br/>
      {loading && <h1 className='text-center'>Loading...</h1>}
      {error && <h1 className='text-center'>Error. Try Refreshing.</h1>}
      

      <BotManageTable
        headers= {['The number of real players who participated','AIs to add','Bot Name', 'Probabilities for bot winning']}
        data={data}
        adminId={props.adminId}
        accessToken={props.accessToken}
        resetAccessToken={() => {props.resetAccessToken()}}
      />
   
  </Container>
  )
}

export default BotManage
