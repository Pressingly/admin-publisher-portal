import get from 'lodash/get'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'

import { envGlobalVar } from '~/core/apolloClient'
import { ITEMS_PER_PAGE } from '~/core/constants/pagination'
import { fetchMembershipCustomers } from '~/core/utils/request'

import {
  MembershipOrgView,
  MembershipUser,
  MembershipUserView,
  PaginationValue,
} from './interfaces'
import PaginationFooter from './Pagination'
import { SubscriptionChargesByUser } from './SubscriptionChargesByUser'
import Summaries from './Summaries'

import { Icon } from '../designSystem'

const { publisherRevenueApiUrl } = envGlobalVar()

interface MembershipUsersListProps {
  selectedMembership: MembershipOrgView
  setSelectedMembership: Dispatch<SetStateAction<MembershipOrgView | null>>
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

const Title = styled.h1`
  font-size: 16px;
  color: rgb(25, 33, 46);
  margin: 0;
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
const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
`

const BreadcrumbItem = styled.span`
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Separator = styled.span`
  margin: 0 8px;
  font-weight: 600;
  color: #666;
`

const Period = styled.p`
  margin-bottom: 20px;
`

const NoTransaction = styled.div`
  margin-top: 50px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #000000;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const SearchBar = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const summaryData = [
  { title: 'Total amount', value: '$220.00' },
  { title: 'Interchange fee', value: '$20.00' },
  { title: 'In Dispute', value: '$0.00' },
  { title: 'Receivables', value: '$200.00' },
  { title: 'Paid amount', value: '$0.00' },
  { title: 'Unpaid amount', value: '$0.00' },
]

export function MembershipUsersList({
  selectedMembership,
  setSelectedMembership,
}: MembershipUsersListProps) {
  const [memUsers, setMemUsers] = useState<MembershipUser[]>([])
  const [selectedUser, setSelectedUser] = useState<MembershipUserView | null>(null)
  const [page, setPage] = useState<PaginationValue>({ currentPage: '0', totalItem: 0 })
  const urlText = `${publisherRevenueApiUrl.toString()}subscription-charges/memberships/${
    selectedMembership.id
  }/users`

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetchMembershipCustomers(urlText)

        const memUserData = get(response, 'data.list', [])
        const curTotalItem = get(response, 'data.total', 0) as number

        setPage((prev) => ({ ...prev, totalItem: curTotalItem }))
        setMemUsers(memUserData)
      } catch (error) {
        console.error('Failed to fetch user list:', error) // eslint-disable-line no-console
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetchMembershipCustomers(urlText, page.currentPage)

        const memUserData = get(response, 'data.list', [])
        const curTotalItem = get(response, 'data.total', 0) as number

        setPage((prev) => ({ ...prev, totalItem: curTotalItem }))
        setMemUsers(memUserData)
      } catch (error) {
        console.error('Failed to fetch user list:', error) // eslint-disable-line no-console
      }
    })()
  }, [page.currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const membershipUsersData = memUsers.map((memUser) => {
    const id = memUser.membershipUserId
    const totalAmount = `$${memUser.totalAmount}`

    return {
      id,
      customer: '-',
      totalAmount,
      interchangeFee: '-',
      receivables: '-',
      paidAmount: '-',
      unpaidAmount: '-',
      inDispute: '-',
      status: '-',
      paymentStatus: '-',
      paymentDate: '-',
    }
  })

  const handleReturn = () => {
    setSelectedMembership(null)
  }

  if (!selectedUser) {
    return (
      <section>
        <Header>
          <BreadcrumbContainer>
            <BreadcrumbItem onClick={handleReturn}>Receivables</BreadcrumbItem>
            <Separator>&gt;</Separator>
          </BreadcrumbContainer>
          <SearchBar placeholder="Search..." />
        </Header>
        <Title>{selectedMembership.org}</Title>
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
              <Th>CUSTOMER</Th>
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
            {membershipUsersData.map((item) => (
              <Tr key={item.id} onClick={() => setSelectedUser(item)}>
                <Td>{item.id}</Td>
                <Td>{item.customer}</Td>
                <Td>{item.totalAmount}</Td>
                <Td>{item.interchangeFee}</Td>
                <Td>{item.receivables}</Td>
                <Td>{item.paidAmount}</Td>
                <Td>{item.unpaidAmount}</Td>
                <Td>{item.inDispute}</Td>
                <Td>{item.paymentStatus}</Td>
                <Td>{item.paymentDate}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        {memUsers.length === 0 ? (
          <NoTransaction>No transaction available</NoTransaction>
        ) : (
          page.totalItem > ITEMS_PER_PAGE && (
            <PaginationFooter {...page} setPage={setPage} currPageCount={memUsers.length} />
          )
        )}
      </section>
    )
  }

  return (
    <SubscriptionChargesByUser
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      selectedMembership={selectedMembership}
      setSelectedMembership={setSelectedMembership}
    />
  )
}
