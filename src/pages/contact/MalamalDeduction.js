import React,{useState} from 'react'
import { Card, CardBody, Container, Row, Col , Label, Button, Input, Form, FormGroup} from 'reactstrap'
import Response from "../../lib/Response";
import apiClient from '../../lib/apiClient';
import SweetAlerts from '../components/SweetAlerts';

function MalamalDeduction(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [malamalDeduction, setMalamaallDeduction] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSweetAlert, setShowSweetAlert] = useState(false)


  const getConfigDetails = async () => {
    setInProgress(true);
    const res = await apiClient('/adminConfigGet', 'GET', null, {admin_id:props.adminId, access_token:props.accessToken});
    
    if (res.responseCode === Response.STATUS_OK) {  
      setMalamaallDeduction(res.responseData.malamaal_deduction_percentage);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setLoading(false);
  }

  const updateConfig = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    //making api call to update data
    let updatedData = {admin_id:props.adminId, access_token:props.accessToken}
    if (typeof malamalDeduction !== "undefined" && !isNaN(parseInt(malamalDeduction)) ) updatedData.malamaal_deduction_percentage = malamalDeduction;

    const res = await apiClient('/adminUpdateConfig', 'POST', updatedData);

    if (res.responseCode === Response.STATUS_OK) {
     setShowSweetAlert(true);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage)
    }
  }

  React.useEffect(() => {
    getConfigDetails();
    props.setRouteBreadCrumbs([{route: '/malamaal_deduction', title: 'Malamaal Deduction'}]);
  }, [])

  return (
    <Container>
      <h1 className='text-center'>MALAMAAL DEDUCTION</h1><br/>
      {loading && <h1 className='text-center'>Loading...</h1>}
      {error && <h1 className='text-center'>Error. Try Refreshing.</h1>}
     
      <Card style={{marginTop:"30px"}}>
        <CardBody>
          <Form onSubmit={updateConfig}>
            <Row>
              <Col sm={3} />
              <Col sm={6}>
                <FormGroup className='text-center'>
                  <Label style={{fontSize:'18px', textAlign:'center'}}>Malamaal Deduction Parameter Percentage <br/>SET %</Label>
                  <Input style={{width:'40%', margin:'0 auto', textAlign:'center'}} value={malamalDeduction} onChange={(e)=>setMalamaallDeduction(e.target.value)} type="number" />
                </FormGroup>
              </Col>
              <Col sm={3} />
            </Row>

            <br/>

            <FormGroup style={{"textAlign": "center"}}>
              <Row>
                <Col sm={4} />
                <Col sm={4}>
                  <Button  color="success" size="lg" type="submit" >Confirm</Button>
                </Col>
                <Col sm={4} />
              </Row>
             
            </FormGroup>
          </Form>
        
         {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}

       </CardBody>
     </Card>

     {showSweetAlert && 
     <SweetAlerts
      isOpen={showSweetAlert}
      data={"Updated!"}
      toggle={() => { setShowSweetAlert(false);}}
     />
     }
    
    </Container>
  )
}

export default MalamalDeduction
