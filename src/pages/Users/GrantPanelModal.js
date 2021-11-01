import React, {useState} from 'react'
import { Modal , ModalHeader, ModalBody, Form, Input, Row,FormGroup, Button, Col, Label} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import Response from '../../lib/Response';
// import { useHistory, useParams } from 'react-router-dom';

function GrantPanelModal(props) {
  const [addChips, setAddChips] = useState('')
  const [addXP, setAddXP] = useState('')
  const [removeChips, setRemoveChips] = useState('')
  const [removeXP, setRemoveXP] = useState('')
  const [errorMessage, setErrorMessage] = useState("")

  // let history = useHistory();

  //function to reset the data field once after model is closed
  const resetData = () => {
    if (addChips !== '') setAddChips('');
    if (addXP !== '') setAddXP('');
    if (removeChips !== '') setRemoveChips('');
    if (removeXP !== '') setRemoveXP('');
    if (errorMessage !== '') setErrorMessage('');
  } 

  //on submitting the form, updating user details
  const updateUserDetail = async (e) => {
    e.preventDefault();
    setErrorMessage('')

    //making api call to update data
    let updatedData = {admin_id:props.adminId, access_token:props.accessToken, other_user_id:props.userId}
    if (typeof addChips !== "undefined" && addChips.trim() !== "") {
      updatedData.chips = addChips;
      updatedData.chips_addition = Constants.CHIPS_ADDING;
    }
     
    if (typeof removeChips !== "undefined" && removeChips.trim() !== "") {
      updatedData.chips = removeChips;
      updatedData.chips_addition = Constants.CHIPS_REMOVING;
    }

    if (typeof addXP !== "undefined" && addXP.trim() !== "") {
      updatedData.xp = addXP;
      updatedData.xp_addition = Constants.XP_ADDING;
    } 

    if (typeof removeXP !== "undefined" && removeXP.trim() !== "") {
      updatedData.xp = removeXP;
      updatedData.xp_addition = Constants.XP_REMOVING;
    } 

    const res = await apiClient('/adminUpdatePlayer', 'POST', updatedData);
    if (res.responseCode === Response.STATUS_OK) {
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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <ModalHeader toggle={props.toggle}>
      <span style={{fontSize:'40px'}}>GRANT PANEL</span>
    </ModalHeader>
    <ModalBody >
    {!props.isOpen && resetData()}
     <Form onSubmit={updateUserDetail}>
       <Row>
        <Col md="6">
          <FormGroup>
            <Label>Add Chips:</Label>
            <Input type="name" value={addChips} onChange={(e) => setAddChips(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Add XP:</Label>
            <Input type="name" value={addXP} onChange={(e) => setAddXP(e.target.value)} />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label>Remove Chips:</Label>
            <Input type="name" value={removeChips} onChange={(e) => setRemoveChips(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Remove XP:</Label>
            <Input type="name" value={removeXP} onChange={(e) => setRemoveXP(e.target.value)} />
          </FormGroup>
        </Col>
       </Row>
       <br/>
        <FormGroup style={{"textAlign": "center"}}>
          <Button size="lg" color="success"  type="submit"  > Grant </Button> &emsp;
          <Button size="lg" color="danger" onClick={() => props.toggle()} >cancel</Button>
        </FormGroup>
        {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
       
     </Form>
      
    </ModalBody>

  </Modal> 
  )
}

export default GrantPanelModal
