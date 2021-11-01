import React, {useState} from 'react'
import { Modal , ModalBody, CardImg, Form, FormGroup, Button, Col, Label} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import Response from '../../lib/Response';

function DeleteUserModal(props) {
  const [errorMessage, setErrorMessage] = useState("")

  //on submitting the form, updating user details
  const deleteUser = async (e) => {
    e.preventDefault();
    setErrorMessage('')

    //making api call to update data
    let updatedData = {admin_id:props.adminId, access_token:props.accessToken, other_user_id:props.userDetail.user_id, status:Constants.CONTENT_DELETED}
    const res = await apiClient('/adminUpdatePlayer', 'POST', updatedData);
    if (res.responseCode === Response.STATUS_OK) {
      //reloading the table and closing the model
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
      DELETE PROFILE <span style={{float:"right", fontSize:"16px", fontWeight:"400"}} >Chips:<br/>{props.userDetail.chips}</span>
      <br/>
      <CardImg  style={{textAlign:"center", borderRadius:"50%", width:"150px"}} src={props.userDetail.profile_picture} />
      <span style={{marginLeft:"20px",fontWeight:"400", fontSize:"18px"}} >{props.userDetail.user_name}</span>
      <Form onSubmit={deleteUser}>
        <FormGroup>
          <Col sm="12" className="text-center">
            <Label>Are you sure want to delete this Profile?</Label>
          </Col>
        </FormGroup>
        <br/>
        <FormGroup style={{"textAlign": "center"}}>
          <Button color="success"  type="submit"> Confirm </Button> &emsp;
          <Button  color="danger" onClick={() => props.toggle()} >cancel</Button>
        </FormGroup>
        {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
      </Form>
    </ModalBody>

  </Modal>
  )
}

export default DeleteUserModal
