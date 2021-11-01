import React from 'react'
import { Container } from 'reactstrap'

const containerStyle = {
  position:'relative',
  margin: 'auto 0',
  display:'inline-block',
  verticalAlign:'middle',
  textAlign:'center',
  width:'calc(100%-250px)'
 }

function IndexPage() {
  return (
   <Container fluid={true} style={containerStyle}>
     <h1><b>TOP TEENPATTI GOLD</b></h1>
   </Container>
  )
}

export default IndexPage
