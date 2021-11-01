import React, {useState} from 'react'
import { Container, Table, Button } from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import Response from '../../lib/Response';
import ReactPaginate from 'react-paginate';
import Filters from './Filters';
import ViewPackDetailsModal from './ViewPackDetailsModal';
import ConfirmationModal from '../components/ConfirmationModal';

const buttonStyle = {
  background:"white", 
  color:"black",
  borderColor:"black",
  borderRadius:'0px'
}

function TwoHeaderView({headers, tableTitle, isContainFilter,  ...props}) {
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

  const [fromDate, setFromDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)))
  const [toDate, setToDate] = useState(new Date())

  const [iapPurchases, setIapPurchases] = useState([])
  const [userWallet, setUserWallet] = useState([])

  const [viewPackDetails, setViewPackDetails] = useState(false)
  const [viewdate, setViewdate] = useState('');
  const [viewData, setViewData] = useState([])

  const [appliedPopup, setAppliedPopup] = useState(false);

  const loadAnalyticsDetail = async () => {
    setInProgress(true);

    const params = {admin_id:props.adminId, access_token:props.accessToken, type: props.analyticsType}
   
    if(isContainFilter || [Constants.ANALYTICS_TYPE_2].includes(parseInt(props.analyticsType)) ) {
      params.page = pageNumber+1;
      params.limit = limit;
      if (typeof fromDate !== "undefined" && fromDate !== '') params.time_frame_start_time = fromDate.getFullYear()+'-'+("0"+(fromDate.getMonth()+1)).slice(-2)+'-'+("0"+fromDate.getDate()).slice(-2);
      if (typeof toDate !== "undefined" && toDate !== '') params.time_frame_end_time = toDate.getFullYear()+'-'+("0"+(toDate.getMonth()+1)).slice(-2)+'-'+("0"+toDate.getDate()).slice(-2);
    }
  
    const res = await apiClient('/adminGetTransactionHistory', 'GET', null, params);

    console.log(res);

    if (res.responseCode === Response.STATUS_OK) {
      if(props.analyticsType === Constants.ANALYTICS_TYPE_2) setIapPurchases(res.responseData.total_iap_purchases);
      else if(props.analyticsType === Constants.ANALYTICS_TYPE_4) setUserWallet(res.responseData.user_wallet_range_percentage);
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

  const handleFilterdates = (from, to) => {
    setFromDate(from);
    setToDate(to);
    setAppliedPopup(true);
    handleConfirmModal();
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
  }, []);

  const handleViewPackDetails = (item) => {
    setViewPackDetails(true);
    setViewdate(item.date);
    setViewData(item.pack_details);
  }

  return (
    <Container>
      <div className="d-flex flex-column align-items-center"  style={{'overflowX': 'scroll','position': 'relative', 'height':'80vh'}}>
      
      <h3>{tableTitle}</h3>

      {isContainFilter && 
          <Filters 
            handleFilterdates={handleFilterdates}
          />
      }

      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {/* {!error && data.length === 0 && ((!inProgress && loadAnalyticsDetail(true) && false) || (!loading && (!loadMoreData ? <h1>No Data found</h1> : <h1>Loading...</h1>)))} */}
      
      {props.analyticsType === Constants.ANALYTICS_TYPE_1 && 
       <span>
        <h5 className="text-center"><br/><b>Total Users: <br/>{totalUsers}</b></h5>
       </span>
      }

      <br/>
      <Table responsive hover>
        <thead>
          <tr className="text-capitalize align-middle text-center"> 
            {headers.map((item, index) =>  <th key={index}>{item}</th> )}
          </tr>
        </thead>

        <tbody>
        
          {props.analyticsType === Constants.ANALYTICS_TYPE_2 && iapPurchases.map(({date,pack_details}, i) => (
            <tr key={i} className="text-capitalize align-middle text-center">
              <td>{date}</td>
              <td><Button style={buttonStyle} onClick={()=> handleViewPackDetails({date,pack_details})} >View</Button></td>
            </tr>   
          ))}

          {props.analyticsType === Constants.ANALYTICS_TYPE_4 && userWallet.map(({wallet_range ,percentage, total_user, wallet_range_name}, i) => (
            <tr key={i} className="text-capitalize align-middle text-center">
              <td>{wallet_range_name}</td>
              <td>{`${total_user} (${percentage}%)`}</td>
            </tr>   
          ))}

        </tbody>

      </Table>
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

      {viewPackDetails && 
      <ViewPackDetailsModal
        data={viewData}
        date={viewdate}
        analyticsType = {props.analyticsType}
        isOpen={viewPackDetails}
        toggle={()=> setViewPackDetails(false)}
        accessToken={props.accessToken}
        adminId ={props.adminId}
        resetAccessToken={() => {props.resetAccessToken()}}
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

export default TwoHeaderView
