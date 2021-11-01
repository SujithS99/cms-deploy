import React,{useState} from 'react'
import { Card, CardBody, Container, Row, Col , Label, Button} from 'reactstrap'
import Response from "../../lib/Response";
import apiClient from '../../lib/apiClient';
import UpdateEmail from './UpdateEmail';
import UpdateNumber from './UpdateNumber';

const buttonStyle = {
  background:"white", 
  color:"black",
  borderColor:"black"
}

function ContactSupport(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [emailId, setEmailId] = useState('');
  const [phNumber, setPhNumber] = useState('')

  const [updateEmail, setUpdateEmail] = useState(false);
  const [updateNumber, setUpdateNumber] = useState(false)


  const getConfigDetails = async () => {
    setInProgress(true);
    const res = await apiClient('/adminConfigGet', 'GET', null, {admin_id:props.adminId, access_token:props.accessToken});
    
    if (res.responseCode === Response.STATUS_OK) {  
      setEmailId(res.responseData.email_id);
      setPhNumber(res.responseData.whatsapp_number);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setLoading(false);
  }

  return (
   <Container>
     <h1 className='text-center'>Manage Contact Support</h1><br/>
     {loading && <h1 className='text-center'>Loading...</h1>}
     {error && <h1 className='text-center'>Error. Try Refreshing.</h1>}
     {!error &&  ((!inProgress && getConfigDetails() ))}
     
     <Card style={{marginTop:"30px"}}>
       <CardBody>
         <Row>
           <Col sm="2" />
           <Col sm="2">
              <Label><b>Email:</b></Label>&nbsp;
            </Col>
            <Col sm="4">
              <p>{emailId?emailId:''}</p>
           </Col>
           <Col sm="3">
             <Button style={buttonStyle} onClick={()=> setUpdateEmail(true)}>Edit</Button>
           </Col>
           <Col sm="1" />
         </Row>
       </CardBody>
     </Card>
     <Card style={{marginTop:"30px"}}>
       <CardBody>
         <Row>
           <Col sm="2" />
           <Col sm="2">
            <Label><b>Ph.No:</b></Label>&nbsp;
          </Col>
          <Col sm="4">
            <p>{phNumber?phNumber:''}</p>
          </Col>
           <Col sm="3">
              <Button  style={buttonStyle} onClick={()=> setUpdateNumber(true)} >Edit</Button>
           </Col>
           <Col sm="1" />
         </Row>
       </CardBody>
     </Card>
    
    {/* Model to update email id */}
    {updateEmail && 
      <UpdateEmail
          accessToken={props.accessToken}
          adminId ={props.adminId}
          isOpen={updateEmail}
          resetAccessToken={() => {props.resetAccessToken()}}
          toggle={() => { setUpdateEmail(false); }}
          refresh = {() => {setEmailId(''); setLoading(true); setInProgress(false)}}
          email={emailId}
        />
    }

     {/* Model to update ph number */}
     {updateNumber && 
      <UpdateNumber
          accessToken={props.accessToken}
          adminId ={props.adminId}
          isOpen={updateNumber}
          resetAccessToken={() => {props.resetAccessToken()}}
          toggle={() => { setUpdateNumber(false); }}
          refresh = {() => {setPhNumber(''); setLoading(true); setInProgress(false)}}
          number={phNumber}
        />
    }

   </Container>
  )
}

export default ContactSupport
