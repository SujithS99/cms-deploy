import React, {useState} from 'react'
import { Container, Table, Button, Input, Row, Col } from 'reactstrap';
import SweetAlerts from '../components/SweetAlerts';
import Response from "../../lib/Response";
import apiClient from '../../lib/apiClient';
import { object } from 'prop-types';
import Constants from '../../lib/constant';

function BotManageTable({headers, data,...props}) {
  const [botData, setBotData] = useState(data);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState({});
  const [showSweetAlert, setShowSweetAlert] = useState(false)
  const [disabled, setdisabled] = useState(false)

  React.useEffect(() => {
    setBotData(data)
  }, [props])

  //on Change names, store it in object data
  const handleChange = (evt, key, bot_id) => {
    setIsEditing({key, bot_id})
    let percentage = evt.target.value ;
    
    let botDataClonned =  botData;
    botDataClonned[key][bot_id] = parseInt(evt.target.value);
    setBotData({...botDataClonned})
    
    if(percentage < 1 || percentage > 100  )
    {
      setdisabled(true)
      setErrorMessage('Percentage should be in between 1 and 100');
      return;
    }

    setIsEditing({})
    setErrorMessage('')
    setdisabled(false)
  }

  const updatePercentage = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    //making api call to update data
    let updatedData = {admin_id:props.adminId, access_token:props.accessToken, bot_winning_percentage:JSON.stringify(botData)}

    console.log(updatedData);

    const res = await apiClient('/adminUpdateConfig', 'POST', updatedData);
    console.log(res);

    if (res.responseCode === Response.STATUS_OK) {
     setShowSweetAlert(true);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage)
    }
  }
  return (
    <Container>
      <Table responsive  bordered>
          <thead>
            <tr className="text-capitalize align-middle text-center"> 
              {headers.map((item, index) =>  <th key={index}>{item}</th> )}
            </tr>
          </thead>
              
            <tbody>
              {Object.entries(botData).map(([key, value], i)  => 
              <tr key={i}>
                <td> {Constants.TOTAL_REAL_PLAYER_COUNT-key} Player</td>

                {<td>
                    <table>
                      {Object.entries(value).map(([bot_id, percentage], j) => 
                      <tr key={j}>
                        <td style={{border:'none'}}>{bot_id}</td>

                      </tr>
                      )}
                    </table>
                </td>}

                {<td>
                    <table>
                      {Object.entries(value).map(([bot_id, percentage], j) => 
                      <tr key={j}>
                        <td style={{border:'none'}}>{bot_id}</td>
                      </tr>
                      
                      )}
                    </table>
                    
                </td>}

                {<td>
                    <table>
                      {Object.entries(value).map(([bot_id, percentage], j) => 
                      <tr key={j}>
                        <td style={{border:'none'}}>
                          <Input 
                            value={(percentage && botData[key][bot_id] === undefined) ? percentage :(botData[key][bot_id]?botData[key][bot_id] : '')}
                            // value={percentage ? percentage :''} 
                            onChange={(e)=> handleChange(e, key, bot_id)} />

                          {isEditing.key === key && isEditing.bot_id === bot_id && errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
                        </td>
                  
                      </tr>
                      )}
                    </table>
                  </td>}

              </tr>
              
              
              )}
            
            </tbody> 
        </Table>

        <br/>
         <Row sm={12} style={{ justifyContent:'center'}}>
            <Button disabled={disabled} onClick={(e)=> updatePercentage(e)} >Save Changes</Button> 
         </Row>
        
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

export default BotManageTable
