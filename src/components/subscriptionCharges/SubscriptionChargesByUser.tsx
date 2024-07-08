import get from 'lodash/get'
import { DateTime } from 'luxon'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'

import { envGlobalVar } from '~/core/apolloClient'
import { ITEMS_PER_PAGE } from '~/core/constants/pagination'
import { fetchSubChargesByUser } from '~/core/utils/request'

import {
  MembershipOrgView,
  MembershipUserView,
  PaginationValue,
  SubscriptionCharge,
} from './interfaces'
import PaginationFooter from './Pagination'
import Summaries from './Summaries'

import { Icon } from '../designSystem'

interface SubscriptionChargesByUserProps {
  selectedUser: MembershipUserView
  selectedMembership: MembershipOrgView
  setSelectedUser: Dispatch<SetStateAction<MembershipUserView | null>>
  setSelectedMembership: Dispatch<SetStateAction<MembershipOrgView | null>>
}
const { publisherRevenueApiUrl } = envGlobalVar()

function formatDate(isoString: string) {
  const dateTime = DateTime.fromISO(isoString)

  return dateTime.toFormat('dd LLL, HH:mm')
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
  padding: 16px 0;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`

const Detail = styled.div`
  font-size: 16px;
  color: #111928;
  font-weight: 600;
  margin: 10px 0;
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

const Title = styled.h1`
  font-size: 16px;
  color: rgb(25, 33, 46);
  margin: 0;
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

const currencyMap: Record<string, string> = {
  USD: '$',
}

export function SubscriptionChargesByUser({
  selectedUser,
  selectedMembership,
  setSelectedUser,
  setSelectedMembership,
}: SubscriptionChargesByUserProps) {
  const [subCharges, setSubCharges] = useState<SubscriptionCharge[]>([])
  const [page, setPage] = useState<PaginationValue>({ currentPage: '0', totalItem: 0 })
  const urlText = `${publisherRevenueApiUrl.toString()}subscription-charges/memberships/${
    selectedMembership.id
  }/users/${selectedUser.id}`

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetchSubChargesByUser(urlText)

        const memUserData = get(response, 'data.list', [])
        const curTotalItem = get(response, 'data.total', 0) as number

        setPage((prev) => ({ ...prev, totalItem: curTotalItem }))
        setSubCharges(memUserData)
      } catch (error) {
        console.error('Failed to fetch subscription charges:', error) // eslint-disable-line no-console
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetchSubChargesByUser(urlText, page.currentPage)

        const memUserData = get(response, 'data.list', [])
        const curTotalItem = get(response, 'data.total', 0) as number

        setPage((prev) => ({ ...prev, totalItem: curTotalItem }))
        setSubCharges(memUserData)
      } catch (error) {
        console.error('Failed to fetch membership orgs:', error) // eslint-disable-line no-console
      }
    })()
  }, [page.currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const subscriptionChargesData = subCharges.map((subCharge) => {
    const scId = subCharge.id
    const currency = currencyMap[subCharge.currencyCode]
    const amount = `${currency}${subCharge.amount}`

    return {
      scId,
      description: subCharge.description,
      amount,
      interchangeFee: '-',
      receivables: '-',
      paidAmount: '-',
      unpaidAmount: '-',
      inDispute: '-',
      subscriptionChargeStatus: '-',
      createdDate: formatDate(subCharge.createdAt),
      updatedDate: formatDate(subCharge.updatedAt),
      paymentDate: '-',
    }
  })

  return (
    <section>
      <Header>
        <BreadcrumbContainer>
          <BreadcrumbItem onClick={() => setSelectedMembership(null)}>Receivables</BreadcrumbItem>
          <Separator>&gt;</Separator>
          <BreadcrumbItem onClick={() => setSelectedUser(null)}>{selectedMembership.org}</BreadcrumbItem>
        </BreadcrumbContainer>
        <SearchBar placeholder="Search..." />
      </Header>
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
      {subCharges.length === 0 ? (
        <NoTransaction>No transaction available</NoTransaction>
      ) : (
        page.totalItem > ITEMS_PER_PAGE && (
          <PaginationFooter {...page} setPage={setPage} currPageCount={subCharges.length} />
        )
      )}
    </section>
  )
}
