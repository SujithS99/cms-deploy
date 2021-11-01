import React from 'react'
import { ModalHeader, Modal, ModalBody } from 'reactstrap'

function JsonDataModal(props) {

  return (
    <Modal
    isOpen={props.isOpen}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <ModalHeader toggle={props.toggle}>
        <span style={{fontSize:'40px'}}> Raw JSON Data</span>
      </ModalHeader>
      <ModalBody style={{background:"grey", color:"white", padding:"30px"}}>
        <p>
          "PID":"{props.data.user_id}"<br/>
          "current_device_id":"{props.data.device_id}"<br/>
          "country":"{props.data.country}"<br/>
          "longitude":"{props.data.Long}"<br/>
          "latitude":"{props.data.Lat}"<br/>
          "user_ref_code":"{props.data.ref_code}"<br/>
          "facebook_email":"{props.data.facebook_email_id}"<br/>
          "playstore_email":"{props.data.playstore_email_id}"<br/>
          "blocked_reason":"xxx"<br/>
          "blocked_date":"{props.data.last_blocked_date}"<br/>
          "blocked_tll":"{props.data.blocked_till}"<br/>
          "last_login_date":"{props.data.last_access_time}"<br/>
          "registered_date":"{props.data.playing_since}"<br/>
          "level":"{props.data.level}"<br/>
          "xp_number":"{props.data.xp}"<br/>
          "ip_address":"{props.data.user_ip}"<br/>
          "city":"{props.data.city}"<br/>
          "total_revenue":"{props.data.total_revenue}"<br/>
          "device_resolution":"{props.data.device_resolution}"<br/>
          "device_serial_number":"{props.data.serial_number}"<br/>
          "device_name":"{props.data.device_name}"<br/>
          "device_model":"{props.data.device_model}"<br/>
          "device_type":"{props.data.device_type}"<br/>
        </p>
      </ModalBody>
    </Modal>
  )
}

export default JsonDataModal
