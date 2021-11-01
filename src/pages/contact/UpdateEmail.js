import React,{useState} from 'react'
import { Modal, ModalBody, Row, Col , FormGroup, Button,Form, Input} from 'reactstrap'
import Response from "../../lib/Response";
import apiClient from '../../lib/apiClient';

function UpdateEmail(props) {
  const [emailId, setEmailId] = useState(props.email);
  const [errorMessage, setErrorMessage] = useState('')

  const updateContactSupport = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    //making api call to update data
    let updatedData = {admin_id:props.adminId, access_token:props.accessToken}
    if (typeof emailId !== "undefined" && emailId.trim() !== "") updatedData.email_id = emailId;

    const res = await apiClient('/adminUpdateConfig', 'POST', updatedData);

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
    <ModalBody>
    <h1 style={{fontSize:'40px', textAlign:'center'}}>EDIT SUPPORT EMAIL</h1> <br/> <br/>
     <Form onSubmit={updateContactSupport}>
       <Row>
        <Col md="12">
          <FormGroup>
            <Input type="text" placeholder="Enter Email" value={emailId?emailId:''} onChange={(e) => setEmailId(e.target.value)} />
          </FormGroup>
        </Col>
       </Row>
       <br/> <br/>
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

export default UpdateEmail
