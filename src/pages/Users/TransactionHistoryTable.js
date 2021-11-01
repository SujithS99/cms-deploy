import React from 'react'
import { Container, Table } from 'reactstrap'
import Constants from '../../lib/constant';
import ParseDuration from '../../lib/ParseDuration';

function TransactionHistoryTable({headers,data, ...restProps}) {
  return (
    <Container>
        <Table responsive hover>
          <thead>
            <tr className="text-capitalize align-middle text-center">
            {headers.map((item, index) => 
            <th key={index}>{item}</th>
          )}
            </tr>
          </thead>

          <tbody>
          {data.map(({id,type,name, duration, price, status, date}, i) => (
            <tr key={i} className="text-capitalize align-middle text-center">
              <td style= {type === Constants.PURCHASE_TYPE_SUBSCRIPTION ? { background:'blue', color:'white' } : { background:'purple', color:'white' }}>
                {type === Constants.PURCHASE_TYPE_SUBSCRIPTION ? 'Subscription' : 'IAP'}
              </td>
              <td>{name}</td>
              <td>{ParseDuration(duration)}</td>
              <td>{price}</td>
              <td>{status === Constants.TRANSACTION_STATUS ? 'Success' : 'Failed'}</td>
              <td>{date}</td>
            </tr>
          ))}
          </tbody>

        </Table>
    </Container>
  )
}

export default TransactionHistoryTable
