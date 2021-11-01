import React, {useState} from 'react'
import { Button, Container, Table, Col, Row } from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import Response from '../../lib/Response';
import ReactPaginate from 'react-paginate';
import Filters from './Filters';
import ConfirmationModal from '../components/ConfirmationModal';
// import DateVsPercentage from '../graph/DateVsPercentage';
// import { FaChartBar } from "react-icons/fa";
import TimeToString from '../../lib/TimeToString';

const buttonStyle = {
  background:"white", 
  color:"black",
  borderColor:"black",
  borderRadius:'0px',
  float:'right'
}

function ThreeHeaderView({headers, tableTitle, isContainFilter,  ...props}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [data, setData] = useState([])

  const [index, setIndex] = useState(0);
  const [limit] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0);

  const [userLanguage, setUserLanguage] = useState([])
  const [iapPurchaseStatus, setIapPurchaseStatus] = useState([])
  const [voiceChat, setVoiceChat] = useState([])
  const [sessionTime, setSessionTime] = useState([])

  const [fromDate, setFromDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)))
  const [toDate, setToDate] = useState(new Date())

  const [appliedPopup, setAppliedPopup] = useState(false);

  // const [viewGraph, setViewGraph] = useState(false);
  const [graphData, setGraphData] = useState([])

  const loadAnalyticsDetail = async () => {

    setInProgress(true);

    const params = {admin_id:props.adminId, access_token:props.accessToken, type: props.analyticsType}
   
    if(isContainFilter || [Constants.ANALYTICS_TYPE_3, Constants.ANALYTICS_TYPE_5, Constants.ANALYTICS_TYPE_6 ].includes(parseInt(props.analyticsType)) ) {
      params.page = pageNumber+1;
      params.limit = limit;
      if (typeof fromDate !== "undefined" && fromDate !== '') params.time_frame_start_time = fromDate.getFullYear()+'-'+("0"+(fromDate.getMonth()+1)).slice(-2)+'-'+("0"+fromDate.getDate()).slice(-2);
      if (typeof toDate !== "undefined" && toDate !== '') params.time_frame_end_time = toDate.getFullYear()+'-'+("0"+(toDate.getMonth()+1)).slice(-2)+'-'+("0"+toDate.getDate()).slice(-2);
    }
    const res = await apiClient('/adminGetTransactionHistory', 'GET', null, params);
    console.log(params);
    console.log(res);

    if (res.responseCode === Response.STATUS_OK) {
      if(props.analyticsType === Constants.ANALYTICS_TYPE_1) {
        setUserLanguage(res.responseData.user_language_perecentage); 
        // setGraphData(res.responseData.user_language_perecentage)
      }
      else if(props.analyticsType === Constants.ANALYTICS_TYPE_3) {setIapPurchaseStatus(res.responseData.iap_purchase_status); }
      else if(props.analyticsType === Constants.ANALYTICS_TYPE_5) {setVoiceChat(res.responseData.total_voice_chat_users);}
      else if(props.analyticsType === Constants.ANALYTICS_TYPE_6) {setSessionTime(res.responseData.total_session_time); }
      setTotalUsers(res.responseData.total_users);
      setTotalCount(res.responseData.total_data_count)
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }

    setInProgress(false);
    setLoading(false);
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPageNumber(selectedPage)
  };

  // const viewBarGraph = () => {
  //   setViewGraph(true);
  // }

  const handleFilterdates = (from, to) => {
    setFromDate(from);
    setToDate(to);
    setAppliedPopup(true);
    handleConfirmModal();
    // console.log(to.toISOString().substring(0,10)); 
    // console.log(from.toISOString().split('T')[0]);
    // console.log(from.getTime());
    // var date = new Date(from.getTime());
    // console.log( date.toLocaleDateString()); // "Dec 20"
    // console.log(toDate.toLocaleDateString())
  }

  React.useEffect(() => {
    loadAnalyticsDetail();
  }, [fromDate, toDate])

  const handleConfirmModal = () => {
    window.setTimeout(() => {
      setAppliedPopup(false);
    }, 1500); 
  }

  React.useEffect(() => {
    setLoadMoreData(true)
    loadAnalyticsDetail()
  }, [pageNumber]);

  React.useEffect(() => {
    loadAnalyticsDetail()
  }, [])

  return (
    <Container>
      <div className="d-flex flex-column align-items-center"  style={{'overflowX': 'scroll','position': 'relative', 'height':'80vh'}} >
        <h3>{tableTitle}</h3>
        
        {isContainFilter && 
          <Filters 
            handleFilterdates={handleFilterdates}
            // viewBarGraph={viewBarGraph}
          />
        }
      
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Try Refreshing.</h1>}
        {/* {!error &&  ((!inProgress && iapPurchaseStatus.length === 0 && loadAnalyticsDetail() && (false) ) || (!loading && (!loadMoreData ? <h1>No Data found</h1> : <h1>Loading...</h1>)))} */}
        
        {props.analyticsType === Constants.ANALYTICS_TYPE_1 && 
         <Row>
          <Col sm={12} ><h5 className="text-center"><br/><b>Total Users: <br/>{totalUsers}</b></h5></Col>
          {/* <Col sm={2}  style={{marginTop:'25px'}} >
            <Button><FaChartBar onClick={()=> viewBarGraph()} /> </Button>
          </Col> */}
         </Row>
          
        }

        

        <br/>
        <Table responsive hover>
          <thead>
            <tr className="text-capitalize align-middle text-center"> 
              {headers.map((item, index) =>  <th key={index}>{item}</th> )}
            </tr>
          </thead>

          <tbody>
            {props.analyticsType === Constants.ANALYTICS_TYPE_1 && userLanguage.map(({language_id ,percentage, total_users}, i) => (
              <tr key={i} className="text-capitalize align-middle text-center">
                <td>{(language_id === Constants.LANGUAGE_ENGLISH)  ? 'English' : ((language_id === Constants.LANGUAGE_HINDI) ? 'Hindi' : 'Bangla')}</td>
                <td>{percentage}</td>
                <td>{total_users}</td>
              </tr>   
            ))}

            {/* {props.analyticsType === Constants.ANALYTICS_TYPE_1 && userLanguage.length === 0 &&  !loading &&
              <h3 className="text-center">No Data found </h3>
            } */}


            {props.analyticsType === Constants.ANALYTICS_TYPE_3 && iapPurchaseStatus.map(({date ,purchase_status, success_percentage, success_total_users, failure_percentage, failure_total_users}, i) => (
              <tr key={i} className="text-capitalize align-middle text-center">
                <td>{date}</td>
                <td>{`${success_total_users} (${success_percentage}%)`}</td>
                <td>{`${failure_total_users} (${failure_percentage}%)`}</td>
              </tr>   
            ))}


            {props.analyticsType === Constants.ANALYTICS_TYPE_5 && voiceChat.map(({date ,enabled_percentage, enabled_total_users, disabled_percentage, disabled_total_users}, i) => (
              <tr key={i} className="text-capitalize align-middle text-center">
                <td>{date}</td>
                <td>{`${enabled_total_users} (${enabled_percentage}%)`}</td>
                <td>{`${disabled_total_users} (${disabled_percentage}%)`}</td>
              </tr>   
            ))}

            {props.analyticsType === Constants.ANALYTICS_TYPE_6 && sessionTime.map(({date ,in_app, in_game}, i) => (
              <tr key={i} className="text-capitalize align-middle text-center">
                <td>{date}</td>
                <td>{TimeToString(in_app)}</td>
                <td>{TimeToString(in_game)}</td>
              </tr>   
            ))}


          </tbody>

        </Table>

      {/* {viewGraph && 
      
      <DateVsPercentage 
        data={graphData}
        type={props.analyticsType}
        isOpen={viewGraph}
        accessToken={props.accessToken}
        adminId ={props.adminId}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle ={() => { setViewGraph(false); }}
      />
    } */}

      </div>
      {isContainFilter && totalCount > 0 &&
          <ReactPaginate
              previousLabel={'PREV'}
              nextLabel={'NEXT'}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={(Math.ceil(totalCount/limit))}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
          />
      }

      {appliedPopup && 
        <ConfirmationModal
          isOpen={appliedPopup}
          responseMessage={'Applied'}
        />
      }
    </Container>
  )
}

export default ThreeHeaderView
