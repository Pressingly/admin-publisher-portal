import styled from 'styled-components'

import { MembershipUserView, SubscriptionChargesView } from './interfaces'
import Summaries from './Summaries'

import { Icon } from '../designSystem'

interface SubscriptionChargesByUserProps {
  subscriptionChargesData: SubscriptionChargesView[]
  selectedUser: MembershipUserView
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const THead = styled.thead`
  background-color: #f9fafb;
`

const Th = styled.th`
  text-align: left;
  padding: 10px;
  color: #6b7280;
  border-bottom: 2px solid #ddd;
`

const Tr = styled.tr`
  cursor: pointer;
`

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`
const DetailHeader = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`

const Detail = styled.div`
  font-size: 16px;
  color: #111928;
  font-weight: 600;
  margin: 10px;
`

const FilterContainter = styled.button`
  background-color: white;
  display: flex;
  padding: 8px 11px 8px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`

const Title = styled.h1`
  font-size: 16px;
  color: rgb(25, 33, 46);
  margin: 0;
`

const Period = styled.p`
  margin-bottom: 20px;
`

const summaryData = [
  { title: 'Total amount', value: '$220.00' },
  { title: 'Interchange fee', value: '$20.00' },
  { title: 'In Dispute', value: '$0.00' },
  { title: 'Receivables', value: '$200.00' },
  { title: 'Paid amount', value: '$0.00' },
  { title: 'Unpaid amount', value: '$0.00' },
]

export function SubscriptionChargesByUser({
  subscriptionChargesData,
  selectedUser,
}: SubscriptionChargesByUserProps) {
  return (
    <section>
      <Title>{selectedUser.customer}</Title>
      <Period>Period 01/08/2023 - 31/08/2023</Period>
      <Summaries summaryData={summaryData} />
      <DetailHeader>
        <Detail>Subscription charges</Detail>
        <FilterContainter>
          Filter &nbsp; &nbsp;
          <Icon name="chevron-down" color="dark" size="small" />
        </FilterContainter>
      </DetailHeader>
      <Table>
        <THead>
          <tr>
            <Th>SC ID</Th>
            <Th>DESCRIPTION</Th>
            <Th>AMOUNT</Th>
            <Th>INTERCHANGE FEE</Th>
            <Th>RECEIVABLES</Th>
            <Th>PAID AMOUNT</Th>
            <Th>UNPAID AMOUNT</Th>
            <Th>IN DISPUTE</Th>
            <Th>SUBSCRIPTION CHARGE STATUS</Th>
            <Th>CREATED DATE</Th>
            <Th>UPDATED DATE</Th>
            <Th>PAYMENT DATE</Th>
          </tr>
        </THead>
        <tbody>
          {subscriptionChargesData.map((item) => (
            <Tr key={item.scId}>
              <Td>{item.scId}</Td>
              <Td>{item.description}</Td>
              <Td>{item.amount}</Td>
              <Td>{item.interchangeFee}</Td>
              <Td>{item.receivables}</Td>
              <Td>{item.paidAmount}</Td>
              <Td>{item.unpaidAmount}</Td>
              <Td>{item.inDispute}</Td>
              <Td>{item.subscriptionChargeStatus}</Td>
              <Td>{item.createdDate}</Td>
              <Td>{item.updatedDate}</Td>
              <Td>{item.paymentDate}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {/* {subscriptionCharges.length === 0 ? (
        <NoTransaction>No transaction available</NoTransaction>
      ) : (
        <PaginationFooter {...page} setPage={setPage} currPageCount={subscriptionCharges.length} />
      )} */}
    </section>
  )
}
