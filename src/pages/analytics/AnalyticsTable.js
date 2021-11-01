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
  borderColor:"black",
  borderRadius:'0px'
}

function AnalyticsTable({data, ...props}) {
  return (
    <Container fluid={true} style={containerStyle}>
      {data.map(({analytics_type, analytics_name}, index) => (
        <Card key={index} style={{marginTop:"15px"}}>
          <CardBody style={{background:'#8080808a'}}>
            <Row>
              {/* <Col sm="1" />  */}
              <Col sm="10">
                <p>{analytics_name}</p>
              </Col>
           
              <Col sm="2">
              
                <Button block  style={buttonStyle}
                  onClick={() => props.onClickView({analytics_type, analytics_name})}
                >
                  View
                </Button>
              </Col>

              {/* <Col sm="1" /> */}
            
            </Row>  
          </CardBody>
        </Card>
      ))}
    </Container>
  )
}

export default AnalyticsTable
