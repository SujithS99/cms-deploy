import React, {useState} from 'react'
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import DatePicker from 'react-date-picker';
// import { FaChartBar } from "react-icons/fa";

function Filters({handleFilterdates}) {
  const [fromDate, setFromDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)))
  const [toDate, setToDate] = useState(new Date())
  const [maxdate, setMaxdate] = useState(new Date())

  const [disabled, setDisabled] = useState(false)

  const handleDatePicker  = (date) => {
    if(date !== null)
    {
      setMaxdate(new Date(date.setDate(date.getDate() + 30)))
      setFromDate(new Date(date.setDate(date.getDate() - 30)));
    }

    if(date === null) setFromDate(date)
  }

  React.useEffect(() => {
    if(fromDate !== null && toDate !== null && fromDate.getTime()+ +(1000 * 60 * 60 * 24 * 30) < toDate.getTime() ) setDisabled(true);
    else setDisabled(false);
  }, [fromDate, toDate])

  return (
    <Container> 
      <Row  style={{marginTop:'25px'}}>
      
        <Col sm={2} />
          <Col sm="3">
            <FormGroup >
              <Label>From: </Label>
              <DatePicker
                onChange={handleDatePicker}
                value={fromDate}
                format="dd/MM/yyyy"
              />
            </FormGroup>
          </Col>

          <Col sm="3">
              <FormGroup >
                <Label>To: </Label>
                <DatePicker
                  onChange={setToDate}
                  value={toDate}
                  minDate={fromDate}
                  maxDate={maxdate}
                  format="dd/MM/yyyy"
              />                

              </FormGroup>
            </Col>

          <Col sm="2"  style={{marginTop:'25px'}} >
            <FormGroup >
              <Button size="md" color="primary" disabled={disabled} type="submit" onClick={()=>handleFilterdates(fromDate, toDate)} > Apply </Button>
            </FormGroup>
          </Col>
          <Col sm={2}  />
          {/* <Col sm={2}  style={{marginTop:'25px'}} >
            <Button><FaChartBar onClick={()=> viewBarGraph()} /> </Button>
          </Col> */}
       
    </Row>
    </Container> 
  )
}

export default Filters
