import React from 'react'
import { Container , Row, Col, Card, CardBody, Button, Label} from 'reactstrap'
import CardImg from 'reactstrap/lib/CardImg'
import { useHistory } from 'react-router-dom';

const containerStyle = {
  height: '90vh',
  overflowY: 'auto'
}

function UserCard({ data, ...restProps } ) {

  //functon to redirect the page to another page and handling dynamic breadcrumbs
  let history = useHistory();
  const onClickEdit = (userId, name) => {
    localStorage.setItem("user_id", userId);
    let path = `/user_detail/${userId}`;
    let routeData = [];
    restProps.routebreadcrumbs.map(route => {
      if (routeData.length === 0 && route.title === 'User Management') {
        routeData.push(route);
      }
      return true;
    });

    routeData.push({'route': path, 'title': name});
    restProps.setroutebreadcrumbs(routeData);
    history.push(path);
  }

  return (
    <Container style={containerStyle} >
      {data.map(({user_id, chips, user_name, profile_picture, handleDelete}, index) => (
        <Card key={index} style={{marginTop:"15px"}}>
          <CardBody>
            <Row>
              <Col sm="3">
                <CardImg style={{borderRadius:"50%", width:"100px", height:"100px"}} src={profile_picture} />
              </Col>
              <Col sm="3">
                <br/>
                <Label style={{wordBreak:"break-all"}}>{user_name} </Label>
              </Col>
              <Col sm="2">
                <Label>Chips: <br/>{chips} </Label>
              </Col>
              <Col sm="2">
                <br/>
                <Button block  style={{background:"white", color:"black",borderColor:"black"}}
                onClick={() => onClickEdit(user_id, user_name)}
                >Edit</Button>
              </Col>
              <Col sm="2">
                <br/>
                <Button block onClick={() => handleDelete({user_id, user_name,profile_picture,chips })} style={{background:"white", color:"black",borderColor:"black"}}>Delete</Button>
              </Col>
            </Row>  
          </CardBody>
          
          
        </Card>
       

      ))}
      <br/>

      
    </Container>
  )
}

export default UserCard
