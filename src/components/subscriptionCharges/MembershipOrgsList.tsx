import { useState } from 'react'
import styled from 'styled-components'

import { MembershipOrgView } from './interfaces'
import { MembershipUsersList } from './MembershipUsersList'
import Summaries from './Summaries'

import { Icon } from '../designSystem'

interface MembershipOrgsListProps {
  membershipOrgsData: MembershipOrgView[]
}

const summaryData = [
  { title: 'Total amount', value: '$220.00' },
  { title: 'Interchange fee', value: '$20.00' },
  { title: 'In Dispute', value: '$0.00' },
  { title: 'Receivables', value: '$200.00' },
  { title: 'Paid amount', value: '$0.00' },
  { title: 'Unpaid amount', value: '$0.00' },
]

const mockPaymentData = [
  {
    id: '123',
    customer: 'John Doe',
    totalAmount: 'US$5.00',
    interchangeFee: 'US$0.50',
    receivables: 'US$4.50',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
  {
    id: '124',
    customer: 'Michael Johnson',
    totalAmount: 'US$10.00',
    interchangeFee: 'US$1.00',
    receivables: 'US$9.00',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
  {
    id: '125',
    customer: 'Emma Williams',
    totalAmount: 'US$10.00',
    interchangeFee: 'US$1.00',
    receivables: 'US$9.00',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
  {
    id: '126',
    customer: 'Daniel Brown',
    totalAmount: 'US$10.00',
    interchangeFee: 'US$1.00',
    receivables: 'US$9.00',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
  {
    id: '127',
    customer: 'Olivia Smith',
    totalAmount: 'US$10.00',
    interchangeFee: 'US$1.00',
    receivables: 'US$9.00',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
  {
    id: '128',
    customer: 'James Davis',
    totalAmount: 'US$5.00',
    interchangeFee: 'US$0.50',
    receivables: 'US$4.50',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
  {
    id: '129',
    customer: 'Sophia Miller',
    totalAmount: 'US$10.00',
    interchangeFee: 'US$1.00',
    receivables: 'US$9.00',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
  {
    id: '130',
    customer: 'Ethan Wilson',
    totalAmount: 'US$10.00',
    interchangeFee: 'US$1.00',
    receivables: 'US$9.00',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
  {
    id: '131',
    customer: 'Isabella Garcia',
    totalAmount: 'US$10.00',
    interchangeFee: 'US$1.00',
    receivables: 'US$9.00',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
  {
    id: '132',
    customer: 'Alex Martinez',
    totalAmount: 'US$10.00',
    interchangeFee: 'US$1.00',
    receivables: 'US$9.00',
    paidAmount: '-',
    unpaidAmount: '-',
    inDispute: '-',
    paymentStatus: 'Pending',
    paymentDate: '-',
  },
]

export default mockPaymentData

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
const Period = styled.p`
  margin-bottom: 20px;
`

export function MembershipOrgsList({ membershipOrgsData }: MembershipOrgsListProps) {
  const [selectedMembership, setSelectedMembership] = useState<MembershipOrgView | null>(null)

  if (!selectedMembership) {
    return (
      <section>
        <Period>Period 01/08/2023 - 31/08/2023</Period>
        <Summaries summaryData={summaryData} />
        <DetailHeader>
          <Detail>Details</Detail>
          <FilterContainter>
            Filter &nbsp; &nbsp;
            <Icon name="chevron-down" color="dark" size="small" />
          </FilterContainter>
        </DetailHeader>
        <Table>
          <THead>
            <tr>
              <Th>ID</Th>
              <Th>MEMBERSHIP ORG</Th>
              <Th>TOTAL AMOUNT</Th>
              <Th>INTERCHANGE FEE</Th>
              <Th>RECEIVABLES</Th>
              <Th>PAID AMOUNT</Th>
              <Th>UNPAID AMOUNT</Th>
              <Th>IN DISPUTE</Th>
              <Th>PAYMENT STATUS</Th>
              <Th>PAYMENT DATE</Th>
            </tr>
          </THead>
          <tbody>
            {membershipOrgsData.map((item) => (
              <Tr key={item.id} onClick={() => setSelectedMembership(item)}>
                <Td>{item.id}</Td>
                <Td>{item.org}</Td>
                <Td>{item.total}</Td>
                <Td>{item.interchange}</Td>
                <Td>{item.receivables}</Td>
                <Td>{item.paid}</Td>
                <Td>{item.unpaid}</Td>
                <Td>{item.inDispute}</Td>
                <Td>{item.status}</Td>
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

  return <MembershipUsersList membershipUsersData={mockPaymentData} selectedMembership={selectedMembership}/>
}
