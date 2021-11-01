import React from 'react'
import { Container, Row, Col, Input, Label } from 'reactstrap'

function PlayerDetailTable(props) {
  return (
    <Container style={{background:"gray", padding:"50px", marginTop:"50px"}}>
      <Row>
        <Col sm="4">
          <Label for="user_id" >PID:</Label>
          <Input sm={6} type="name" disabled value={props.data.user_id?props.data.user_id:''}/><br/>
          <Label for="lat" >Latitude:</Label>
          <Input sm={6} type="name" disabled value={props.data.Lat?props.data.Lat:''} /><br/>
          <Label for="facebook_email_id" >Facebook Email:</Label>
          <Input sm={6} type="name" disabled value={props.data.facebook_email_id?props.data.facebook_email_id:''}  /><br/>
          <Label for="last_blocked_date" >Last Blocked Date:</Label>
          <Input sm={6} type="name" disabled value={props.data.last_blocked_date?props.data.last_blocked_date:''}  /><br/>
          <Label for="playing_since" >Created:</Label>
          <Input sm={6} type="name" disabled value={props.data.playing_since?props.data.playing_since:''}  /><br/>
          <Label for="user_ip" >IP Address:</Label>
          <Input sm={6} type="name" disabled value={props.data.user_ip?props.data.user_ip:''}  /><br/>
          <Label for="device_resolution" >Device Resolution:</Label>
          <Input sm={6} type="name" disabled value={props.data.device_resolution?props.data.device_resolution:''}  /><br/>
          <Label for="device_name" >Device Name:</Label>
          <Input sm={6} type="name" disabled value={props.data.device_name?props.data.device_name:''} /><br/>
        </Col>
        <Col sm="4">
          <Label for="device_id" >Current Device ID:</Label>
          <Input sm={6} type="name" disabled value={props.data.device_id?props.data.device_id:''}  /><br/>
          <Label for="Long" >Logitude:</Label>
          <Input sm={6} type="name" disabled value={props.data.Long?props.data.Long:''}  /><br/>
          <Label for="playstore_email_id" >Playstore Email:</Label>
          <Input sm={6} type="name" disabled value={props.data.playstore_email_id?props.data.playstore_email_id:''} /><br/>
          <Label for="blocked_till" >Blocked Till:</Label>
          <Input sm={6} type="name" disabled value={props.data.blocked_till?props.data.blocked_till:''}  /><br/>
          <Label for="level" >Level:</Label>
          <Input sm={6} type="name" disabled value={props.data.level?props.data.level:''} /><br/>
          <Label for="city" >City:</Label>
          <Input sm={6} type="name" disabled value={props.data.city?props.data.city:''}  /><br/>
          <Label for="serial_number" >Serial Number:</Label>
          <Input sm={6} type="name" disabled value={props.data.serial_number?props.data.serial_number:''}  /><br/>
          <Label for="device_type" >Device Type:</Label>
          <Input sm={6} type="name" disabled value={props.data.device_type?props.data.device_type:''}  /><br/>
        </Col>
        <Col sm="4">
        <Label for="country" >Country:</Label>
          <Input sm={6} type="name" disabled value={props.data.country?props.data.country:''}  /><br/>
          <Label for="ref_code" >User Ref Code:</Label>
          <Input sm={6} type="name" disabled value={props.data.ref_code?props.data.ref_code:''}  /><br/>
          <Label for="total_friends" >Friends List:</Label>
          <Input sm={6} type="name" disabled value={props.data.total_friends?props.data.total_friends:''} /><br/>
          <Label for="last_access_time" >Last Login:</Label>
          <Input sm={6} type="name" disabled value={props.data.last_access_time?props.data.last_access_time:''} /><br/>
          <Label for="xp" >XP:</Label>
          <Input sm={6} type="name" disabled value={props.data.xp?props.data.xp:''}  /><br/>
          <Label for="total_revenue" >Total Revenue:</Label>
          <Input sm={6} type="name" disabled value={props.data.total_revenue?props.data.total_revenue:''} /><br/>
          <Label for="device_model" >Device Model:</Label>
          <Input sm={6} type="name" disabled value={props.data.device_model?props.data.device_model:''}  /><br/>
        </Col>
      </Row>
    </Container>
  )
}

export default PlayerDetailTable
