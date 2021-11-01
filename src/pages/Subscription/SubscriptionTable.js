import React from 'react'
import { Card, Container, Row, Col, Button, CardBody, Label } from 'reactstrap'
import Constants from '../../lib/constant';

const containerStyle = {
  height: '90vh',
  overflowY: 'auto'
}

const buttonStyle = {
  background:"white", 
  color:"black",
  borderColor:"black"
}

function SubscriptionTable({data, ...props}) {

  return (
    <Container fluid={true} style={containerStyle}>
      {data.map(({subscription_id, name, users, status, product_id,duration}, index) => (
        <Card key={index} style={{marginTop:"15px"}}>
          <CardBody>
            <Row>
              <Col sm="4">
                <p>{name}</p>
              </Col>
              <Col sm="2">
                <Label>Users:</Label>
                <p>{users}</p>
              </Col>
              <Col sm="2">
                <Label>Product Id:</Label>
                <p>{product_id}</p>
              </Col>
              <Col sm="2">
                <br/>
                <Button block  style={buttonStyle}
                onClick={() => props.onClickEdit({subscription_id, name, product_id, duration})}
                >Edit</Button>
              </Col>
              <Col sm="2">
                <br/>
                <Button block  style={buttonStyle} onClick={() => props.onClickStatus({subscription_id, name, product_id, duration,status})} >{status === Constants.SUBSCRIPTION_ENABLE? "Disable" : "Enable" }</Button>
              </Col>
            </Row>  
          </CardBody>
        </Card>
      ))}
    </Container>
  )
}

export default SubscriptionTable
