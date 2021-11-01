import React, {useState, useEffect} from 'react'
import { Modal , ModalHeader, ModalBody, CardImg} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import TransactionPagination from './TransactionPagination';
import TransactionHistoryTable from './TransactionHistoryTable';

function TransactionHistoryModal(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [transactionData, setTransactionData] = useState([])
  const [index, setIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(0)
  const [limit] = useState(5)

  const heightCheck = event => {
    event.preventDefault();
    //loading data if screen size is big
    if (window.outerHeight > 1000 && transactionData.length < 5 && loadMoreData && !inProgress) {
      loadTransactionList(false);
    }
  };

  const loadTransactionList = async (reset) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);

    const params = {admin_id:props.adminId, access_token:props.accessToken, other_user_id:props.userId, limit:limit, page:pageNumber+1}
    const res = await apiClient('/adminGetUserTransaction', 'GET', null, params);
  
    if (res.responseCode === Response.STATUS_OK) {
      setTransactionData(res.responseData.transactions);
      if (!res.responseData.transactions || res.responseData.transactions.length === 0 ) setLoadMoreData(false);
      else setIndex(res.responseData.total_count)
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setInProgress(false);
    setLoading(false);
  }

  useEffect(() => {
    setLoadMoreData(true)
    loadTransactionList(true)
  }, [pageNumber])

  return (
    <Modal
    onLoad = {heightCheck}
    isOpen={props.isOpen}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <ModalHeader toggle={props.toggle}>
      <span style={{fontSize:'40px'}}>TRANSACTION HISTORY</span>
    </ModalHeader>
    <ModalBody style={{height:'700px'}}>
      <div className="text-center">
        <CardImg  style={{ borderRadius:"50%", width:"150px"}} src={ props.profilePic } />
        <span style={{marginLeft:"20px",fontWeight:"400", fontSize:"18px"}} >{props.userName}</span>
      </div>
      
      <TransactionPagination 
       currentPage = {pageNumber}
       pagesCount = {(Math.ceil(index/limit))}
       handleClick = {(i) => {setPageNumber(i); }}
      />

      <div className="d-flex flex-column align-items-center" >
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {!error && transactionData.length === 0 && ((!inProgress && loadTransactionList(true) && false) || (!loading && (!loadMoreData ? <h1>No Data found</h1> : <h1>Loading...</h1>)))}
     
      {transactionData.length !== 0 && 
      
        <TransactionHistoryTable
        headers={[
          'Purchase Type',
          'Package Name', 
          'Package Duration', 
          'Amount', 
          'Status', 
          'Date & Time'
        ]}

        data={transactionData.map(item => {
          return {
            transaction_id: item.transaction_id,
            type: item.type,
            name: item.name,
            status: item.status,
            price: item.price,
            duration: item.duration,
            date: item.date,
          }
        })}
        routebreadcrumbs={props.routeBreadCrumbs}
        setroutebreadcrumbs={props.setRouteBreadCrumbs}
        resetaccessToken={() => {props.resetAccessToken()}}
        accessToken={props.accessToken}
        />
      }

      </div>
    </ModalBody>

  </Modal>
  )
}

export default TransactionHistoryModal
