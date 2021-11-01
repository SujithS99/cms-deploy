import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlerts = (props) => {
  return (
  <div>
    <SweetAlert
    type={'success'}
    title= {props.data === '' ? 'Updated!' : props.data} 
    show={props.isOpen}
    confirmBtnText="OKAY"
    onConfirm={props.toggle}
    onCancel={props.toggle}
    >
</SweetAlert>
</div>
  );
};


export default SweetAlerts