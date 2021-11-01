import React, {useState, useEffect} from 'react'
import { Modal, ModalHeader,  ModalBody, Form, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import ParseDuration from '../../lib/ParseDuration';

function SUbscriptionUpdate(props) {
  const [subscriptionName, setSubscriptionName] = useState('')
  const [duration, setDuration] = useState('')
  const [productId, setProductId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setSubscriptionName(props.data.name);
    setDuration(ParseDuration(props.data.duration));
    setProductId(props.data.product_id)
  }, [props])

  //function to reset the data field once after model is closed
  const resetData = () => {
    if (subscriptionName !== '') setSubscriptionName('');
    if (duration !== '') setDuration('');
    if (productId !== '') setProductId('');
  } 

  //on submitting the form, updating user details
  const updateSubscription = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if(subscriptionName.trim() === "") {setErrorMessage('Name is mandatory'); return;}
    if(duration.trim() === "") {setErrorMessage('Duration is mandatory'); return;}
    if(productId.trim() === "") {setErrorMessage('Product Id is mandatory'); return;}

    //making api call to update data
    let updatedData = {admin_id:props.adminId, access_token:props.accessToken, subscription_id: props.data.subscription_id}
    if (typeof subscriptionName !== "undefined" && subscriptionName.trim() !== "") updatedData.name = subscriptionName;
    if (typeof duration !== "undefined" && duration.trim() !== "") updatedData.duration = duration;
    if (typeof productId !== "undefined" && productId.trim() !== "") updatedData.product_id = productId;

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
    <span style={{fontSize:'40px'}}>EDIT SUBSCRIPTION</span> <br/>
    </ModalHeader>
    <ModalBody>
    {!props.isOpen && resetData()}
     <Form onSubmit={updateSubscription}>
       <Row>
        <Col md="12">
          <FormGroup>
            <Label>Subscription Name:</Label>
            <Input type="text" value={subscriptionName?subscriptionName:''} onChange={(e) => setSubscriptionName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Duration:</Label>
            <Input type="text" placeholder="number days/months/years" value={duration?duration:''} onChange={(e) => setDuration(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Product Id:</Label>
            <Input type="text" value={productId?productId:''} onChange={(e) => setProductId(e.target.value)} />
          </FormGroup>
        </Col>
       </Row>
       <br/>
        <FormGroup style={{"textAlign": "center"}}>
          <Button size="lg" color="success"  type="submit"  > Confirm </Button> &emsp;
          <Button size="lg" color="danger" onClick={() => props.toggle()} >cancel</Button>
        </FormGroup>
        {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
     </Form>
      
    </ModalBody>

  </Modal> 
  )
}

export default SUbscriptionUpdate
