import React, {useState} from 'react'
import { Button, Container } from 'reactstrap';

import Response from "../../lib/Response";
import apiClient from '../../lib/apiClient';
import AnalyticsTable from './AnalyticsTable';
import AnalyticsView from './AnalyticsView';

function AnalyticsList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);

  const [viewPopup, setViewPopup] = useState(false);
  const [viewData, setViewData] = useState({});

  const loadAnalyticsList = async () => {
    setInProgress(true);

    //handling dynamic breadcrumbs
    const res = await apiClient('/adminGetAnalyticsList', 'GET', null, {admin_id:props.adminId, access_token:props.accessToken});

    if (res.responseCode === Response.STATUS_OK) {  
      setData(res.responseData.analytics_list);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setInProgress(false);
    setLoading(false);
  }

  const handleClickView = (data) => {
    setViewData(data)
    setViewPopup(true);
  };

  React.useEffect(() => {
    props.setRouteBreadCrumbs([{route: '/analytics_list', title: 'Analytics Management'}]);
    loadAnalyticsList();
  }, [])

  return (
    <Container>
      <h1 className='text-center'>Analytics Management</h1><br/>

      {loading && <h1 className='text-center'>Loading...</h1>}
      {error && <h1 className='text-center'>Error. Try Refreshing.</h1>}
    
      {data.length !== 0 && 
        <AnalyticsTable 
          data={data.map(item => {
            return {
              analytics_type:item.analytics_type,
              analytics_name: item.analytics_name
            }
          })} 
          routebreadcrumbs={props.routeBreadCrumbs}
          setroutebreadcrumbs={props.setRouteBreadCrumbs}
          resetaccessToken={() => {props.resetAccessToken()}}
          accessToken={props.accessToken}
          adminId ={props.adminId}
          onClickView = {handleClickView}

        /> 
      }

      {viewPopup && 
      
        <AnalyticsView 
          isOpen={viewPopup}
          accessToken={props.accessToken}
          adminId ={props.adminId}
          resetAccessToken={() => {props.resetAccessToken()}}
          viewData={viewData}
          toggle ={() => { setViewPopup(false); }}
        />
      }

    </Container>
  )
}

export default AnalyticsList
