import React , {useState} from 'react'
import { Button, Container } from 'reactstrap'
import JsonDataModal from './JsonDataModal';
import PlayerDetailTable from './PlayerDetailTable'

function PlayerDetail(props) {
  const [showJsonData, setShowJsonData] = useState(false)

  return (
    <Container>
      <h1 className="text-center" style={{capitalize:"uppercase"}}>Player Details</h1>
      <br/>
      <div className="text-center">
        <Button outline color="secondary" onClick={() => setShowJsonData(true)}>Fetch Raw JSON Data</Button>
      </div>
      <PlayerDetailTable
        data={props.data}
        routebreadcrumbs={props.routeBreadCrumbs}
        setroutebreadcrumbs={props.setRouteBreadCrumbs}
        resetaccessToken={() => {props.resetAccessToken()}}
        accessToken={props.accessToken}
        adminId ={props.adminId}
      />

      <JsonDataModal
        data={props.data}
        accessToken={props.accessToken}
        adminId ={props.adminId}
        isOpen={showJsonData}
        resetAccessToken={() => {props.resetAccessToken()}}
        toggle ={() => { setShowJsonData(false); }}
      />


    </Container>
  )
}

export default PlayerDetail
