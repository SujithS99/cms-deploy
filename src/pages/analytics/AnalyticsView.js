import React, {useState, useEffect} from 'react'
import { Modal , ModalHeader, ModalBody, Label} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import Response from '../../lib/Response';
import ThreeHeaderView from './ThreeHeaderView';
import TwoHeaderView from './TwoHeaderView';

function AnalyticsView(props) {
  const [analyticsType, setAnalyticsType] = useState(props.viewData.analytics_type);
  const [analyticsName, setAnalyticsName] = useState(props.viewData.analytics_name);
  const [tableTitle, setTableTitle] = useState('')
  const [isContainFilter, setIsContainFilter] = useState(false);
  let [headers, setHeaders] = useState([])
  
  const loadHeaders = (type) => {
    switch(type){
      case 1:
        setTableTitle('Users % on Basis of Language')
        setHeaders(['Language','User%','No.of Users']);
        setIsContainFilter(false);
        break;
      
        case 2:
          setTableTitle('Total Purchases Amount')
          setHeaders(['Date','Pack Details']);
          setIsContainFilter(true);
          break;

        case 3:
          setTableTitle('Purchases Success/Failed')
          setHeaders(['Date', 'Success', 'Fail']);
          setIsContainFilter(true);
          break; 
          
        case 4:
          setTableTitle('Players Wallet Count')
          setHeaders(['Wallet Range', 'No.of Players']);
          setIsContainFilter(false);
          break; 

        case 5:
          setTableTitle('Players Using Voice Chat')
          setHeaders(['Date', 'Enabled', 'Disabled']);
          setIsContainFilter(true);
          break; 
  
        case 6:
          setTableTitle('Time spent By Players')
          setHeaders(['Date', 'In App', 'Playing Game']);
          setIsContainFilter(true);
          break; 

    }
  }

  useEffect(() => {
    loadHeaders(analyticsType)
  }, [analyticsType])

  useEffect(() => {
   setAnalyticsType(props.viewData.analytics_type);
   setAnalyticsName(props.viewData.analytics_name)
  }, [props.viewData])

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

        {[Constants.ANALYTICS_TYPE_1, Constants.ANALYTICS_TYPE_3, Constants.ANALYTICS_TYPE_5, Constants.ANALYTICS_TYPE_6 ].includes(parseInt(analyticsType)) &&
        
          <ThreeHeaderView
            headers ={headers}
            tableTitle={tableTitle}
            isContainFilter={isContainFilter}
            analyticsType={analyticsType}
            analyticsName={analyticsName}
            accessToken={props.accessToken}
            adminId ={props.adminId}
            resetAccessToken={() => {props.resetAccessToken()}}
          />
        
        }

        {[Constants.ANALYTICS_TYPE_2, Constants.ANALYTICS_TYPE_4].includes(parseInt(analyticsType)) &&
        
          <TwoHeaderView
            headers ={headers}
            tableTitle={tableTitle}
            isContainFilter={isContainFilter}
            analyticsType={analyticsType}
            analyticsName={analyticsName}
            accessToken={props.accessToken}
            adminId ={props.adminId}
            resetAccessToken={() => {props.resetAccessToken()}}
          />
      
        }
     
    </ModalBody>

  </Modal>
  )
}

export default AnalyticsView
