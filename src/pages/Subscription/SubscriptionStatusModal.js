import React, {useState, useEffect} from 'react'
import { Modal, ModalHeader,  ModalBody, Form, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap'
import Constants from '../../lib/constant';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';

function SubscriptionStatusModal(props) {
  const [subscriptionName, setSubscriptionName] = useState('')
  const [duration, setDuration] = useState('')
  const [productId, setProductId] = useState('')
  const [errorMessage, setErrorMessage] = useState("")

  //function to reset the data field once after model is closed
  const resetData = () => {
    if (subscriptionName !== '') setSubscriptionName('');
    if (duration !== '') setDuration('');
    if (productId !== '') setProductId('');
  } 

  useEffect(() => {
    setSubscriptionName(props.statusData.name);
    setDuration(props.statusData.duration);
    setProductId(props.statusData.product_id);
  }, [props])

  //on submitting the form, updating user details
  const updateSubscription = async (e) => {
    e.preventDefault();
    setErrorMessage('')

    //making api call to update data
    let updatedData = {admin_id:props.adminId, access_token:props.accessToken, subscription_id: props.statusData.subscription_id}
    // if (typeof subscriptionName !== "undefined" && subscriptionName.trim() !== "") updatedData.name = subscriptionName;
    // if (typeof duration !== "undefined" && duration !== "") updatedData.duration = duration;
    // if (typeof productId !== "undefined" && productId.trim() !== "") updatedData.product_id = productId;
   
    if(props.statusData.status === Constants.SUBSCRIPTION_ENABLE) {
      updatedData.status = (Constants.SUBSCRIPTION_DISABLE)
    } else {
      updatedData.status = (Constants.SUBSCRIPTION_ENABLE)
    }
    
    const res = await apiClient('/adminUpdateSubscription', 'POST', updatedData);
 
    if (res.responseCode === Response.STATUS_OK) {
      props.refresh()
      props.toggle();
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage)
    }
  }
  
  return (
    <Modal
    isOpen={props.isOpen}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <ModalHeader toggle={props.toggle}>
      <span style={{fontSize:'30px'}}>{props.statusData.status ===  Constants.SUBSCRIPTION_DISABLE ? "ENABLE" : "DISABLE"} SUBSCRIPTION </span> <br/>
    </ModalHeader>
    <ModalBody>
    {!props.isOpen && resetData()}
     <Form onSubmit={updateSubscription}>
       <Row>
        <Col md="12">
        <FormGroup>
            <Label>Subscription Name:</Label>
            <Input type="name" disabled value={subscriptionName?subscriptionName:props.statusData.name} onChange={(e) => setSubscriptionName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Duration:</Label>
            <Input type="duration" disabled value={duration?duration:props.statusData.duration} onChange={(e) => setDuration(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Product Id:</Label>
            <Input type="product_id" disabled value={productId?productId:props.statusData.product_id} onChange={(e) => setProductId(e.target.value)} />
          </FormGroup>
        </Col>
       </Row>
       <br/>

       <p>
         {props.statusData.status === Constants.SUBSCRIPTION_ENABLE ?
          "Are you sure you want to Disable this Subscription?" :
          "Are you sure you want to Enable this Subscription?"
          }
       </p>
        <FormGroup style={{"textAlign": "center"}}>
          <Button size="lg" color="success"  type="submit" > Confirm </Button> &emsp;
          <Button size="lg" color="danger" onClick={() => props.toggle()} >cancel</Button>
        </FormGroup>
        {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
     </Form>
    </ModalBody>

  </Modal> 
  )
}

export default SubscriptionStatusModal
