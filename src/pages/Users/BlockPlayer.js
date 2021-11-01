import React, {useState} from 'react'
import { Modal , ModalBody, CardImg, Form, Input, FormGroup, Button, Col, Row} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import Response from '../../lib/Response';

function BlockPlayer(props) {
  const [reason, setReason] = useState('')
  const [errorMessage, setErrorMessage] = useState("")

  //on submitting the form, updating user details
  const updateUserDetails = async (e) => {
    e.preventDefault();
    setErrorMessage('')

    //making api call to update data
    let updatedData = {admin_id:props.adminId, access_token:props.accessToken, other_user_id:props.userId, status:Constants.ACTIVE_STATUS, reason:reason}
    const res = await apiClient('/adminUpdatePlayer', 'POST', updatedData);
    if (res.responseCode === Response.STATUS_OK) {
      //reloading the table and closing the model
      props.refresh()
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
        <h1 className="text-center">BLOCK PROFILE <span style={{float:"right", fontSize:"16px", fontWeight:"400"}} >Chips:<br/>{props.chips}</span></h1>  
        <br/>
        <Row>
          <Col sm="6">
            <CardImg  style={{textAlign:"center", borderRadius:"50%", width:"150px"}} src={props.profilePic} />
          </Col>
          <Col sm="6">
            <span style={{marginTop:"30%",fontWeight:"400", fontSize:"18px", wordBreak:"break-all"}} >{props.userName}</span>
          </Col>
        </Row>
        
        <p className="text-center">Are you sure want to block this Player?</p><br/>
        <Form onSubmit={updateUserDetails}>
          <FormGroup>
            <Col sm="12">
              <Input name="reason" type="text" placeholder="Enter Reason" onChange={(e) => setReason(e.target.value)} />
            </Col>
          </FormGroup>
          <br/>
          <FormGroup style={{"textAlign": "center"}}>
            <Button color="success"  type="submit"  > Confirm </Button> &emsp;
            <Button  color="danger" onClick={() => props.toggle()} >cancel</Button>
          </FormGroup>
          {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
        </Form>
      </ModalBody>

    </Modal>
  )
}

export default BlockPlayer
