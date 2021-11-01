import React, {useState} from 'react'
import { Modal, ModalHeader,  ModalBody, Form, Row, Col, FormGroup, Input, Button} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';

function UserSearch(props) {
  const [pid, setPid] = useState('')
  const [refCode, setRefCode] = useState('')
  const [gPlayEmail, setGPlayEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState("")

  //function to reset the data field once after model is closed
  const resetData = () => {
    if (pid !== '') setPid('');
    if (refCode !== '') setRefCode('');
    if (gPlayEmail !== '') setGPlayEmail('');
    if (errorMessage !== '') setErrorMessage('');
  } 

  const searchUsers = async (e) => {
    e.preventDefault();
    
    if(pid.trim() === "" && refCode.trim() === "" && gPlayEmail.trim() === "") 
    {
      setErrorMessage('Please fill the fields');
      return;
    }

    let params = {admin_id:props.adminId, access_token:props.accessToken}
   
    if (typeof pid !== "undefined" && pid.trim() !== "") params.other_player_id = pid;
    if (typeof refCode !== "undefined" && refCode.trim() !== "") params.ref_code = refCode;
    if (typeof gPlayEmail !== "undefined" && gPlayEmail.trim() !== "") params.email = gPlayEmail;

    const res = await apiClient('/adminGetUsersList', 'GET', null, params);

    if (res.responseCode === Response.STATUS_OK) {
      props.refresh(res.responseData.users)
      props.toggle()
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
      PLAYER SEARCH
    </ModalHeader>
    <ModalBody>
    {!props.isOpen && resetData()}
     <Form onSubmit={searchUsers}>
       <Row>
        <Col md="12">
          <FormGroup>
            <Input type="pid" placeholder="Enter PID" value={pid} onChange={(e) => setPid(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Input type="ref_code" placeholder="Enter Ref Code" value={refCode} onChange={(e) => setRefCode(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Input type="gplay_email" placeholder="Enter Gplay Email" value={gPlayEmail} onChange={(e) => setGPlayEmail(e.target.value)} />
          </FormGroup>
        </Col>
       </Row>
       <br/>
        <FormGroup style={{"textAlign": "center"}}>
          <Button size="lg" color="success"  type="submit"  > Fetch Details </Button> &emsp;
          <Button size="lg" color="danger" onClick={() => props.toggle()} >cancel</Button>
        </FormGroup>
        {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
     </Form>
      
    </ModalBody>

  </Modal> 
  )
}

export default UserSearch
