import React, {useState, useEffect} from 'react'
import { Modal , Col, ModalBody, Label, Table , Button, Row} from 'reactstrap'
// import { FaChartBar } from "react-icons/fa";
// import DateVsPercentage from '../graph/DateVsPercentage';

function ViewPackDetailsModal({data, date, ...props}) {
  // const [viewGraph, setViewGraph] = useState(false);

  return (
    <Modal
    isOpen={props.isOpen}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <ModalBody >
      <Label style={{float:'right'}} onClick={()=>props.toggle()}>
        <svg  id="Icons_Digital_Close" data-name="Icons/Digital/Close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g id="Atmos_Icons_Digital_close" data-name="Atmos/Icons/Digital/close">
            <path id="Path" d="M12,10.384,22.049.335a1.143,1.143,0,0,1,1.616,1.616L13.616,12,23.665,22.049a1.143,1.143,0,0,1-1.616,1.616L12,13.616,1.951,23.665A1.143,1.143,0,0,1,.335,22.049L10.384,12,.335,1.951A1.143,1.143,0,0,1,1.951.335Z" fill="#024"/>
          </g>
        </svg>
      </Label>

      <h3 className="d-flex flex-column align-items-center">Pack Details</h3><br/>
      <Row>
        <Col sm={12} >
          <h5 className="d-flex flex-column align-items-center">Date:&nbsp;{date}</h5><br/>
        </Col>

        {/* <Col sm={2}  >
          <Button ><FaChartBar onClick={()=> setViewGraph(true)} /> </Button>
        </Col> */}
      </Row>
      


      <div className="d-flex flex-column align-items-center" style={{'overflowX': 'scroll','position': 'relative', 'height':'70vh'}} >
       
        <Table>
          <thead>
            <tr className="text-capitalize align-middle text-center">
              <th>Pack Name</th>
              <th>Purchase Amount</th>
            </tr>
          </thead>
          <tbody >
          {data.map(({pack_id, pack_name, total_count}, i) => (
              <tr key={i} className="text-capitalize align-middle text-center">
                <td>{pack_name}</td>
                <td>{total_count}</td>
              </tr>   
            ))}
          </tbody>
        </Table>

      </div>
   
  </ModalBody>

  {/* {viewGraph && 
      
      <DateVsPercentage 
        data={data}
        type={props.analyticsType}
        isOpen={viewGraph}
        accessToken={props.accessToken}
        adminId ={props.adminId}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle ={() => { setViewGraph(false); }}
      />
    } */}

</Modal>
  )
}

export default ViewPackDetailsModal
