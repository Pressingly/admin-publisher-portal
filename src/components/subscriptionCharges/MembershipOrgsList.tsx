import get from 'lodash/get'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { envGlobalVar } from '~/core/apolloClient'
import { ITEMS_PER_PAGE } from '~/core/constants/pagination'
import { fetchMemberships } from '~/core/utils/request'

import { MembershipOrg, MembershipOrgView, PaginationValue } from './interfaces'
import { MembershipUsersList } from './MembershipUsersList'
import PaginationFooter from './Pagination'
import Summaries from './Summaries'

import { Button, Icon, Tooltip } from '../designSystem'

const { publisherRevenueApiUrl } = envGlobalVar()

const membershipNameMap: Record<string, string> = {
  '439db5bd-e607-4689-ad1d-6614a21927da': 'United Airlines',
}

const summaryData = [
  { title: 'Total amount', value: '$220.00' },
  { title: 'Interchange fee', value: '$20.00' },
  { title: 'In Dispute', value: '$0.00' },
  { title: 'Receivables', value: '$200.00' },
  { title: 'Paid amount', value: '$0.00' },
  { title: 'Unpaid amount', value: '$0.00' },
]

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

const Title = styled.h1`
  font-size: 16px;
  color: rgb(25, 33, 46);
  margin: 0;
`

const SearchBar = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export function MembershipOrgsList() {
  const [memberships, setMemberships] = useState<MembershipOrg[]>([])
  const [selectedMembership, setSelectedMembership] = useState<MembershipOrgView | null>(null)
  const [page, setPage] = useState<PaginationValue>({ currentPage: '0', totalItem: 0 })
  const urlText = `${publisherRevenueApiUrl.toString()}subscription-charges/memberships`

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetchMemberships(urlText)

        const memData = get(response, 'data.list', [])
        const curTotalItem = get(response, 'data.total', 0) as number

        setPage((prev) => ({ ...prev, totalItem: curTotalItem }))
        setMemberships(memData)
      } catch (error) {
        console.error('Failed to fetch membership orgs:', error) // eslint-disable-line no-console
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetchMemberships(urlText, page.currentPage)

        const memData = get(response, 'data.list', [])
        const curTotalItem = get(response, 'data.total', 0) as number

        setPage((prev) => ({ ...prev, totalItem: curTotalItem }))
        setMemberships(memData)
      } catch (error) {
        console.error('Failed to fetch membership orgs:', error) // eslint-disable-line no-console
      }
    })()
  }, [page.currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const membershipOrgsData = memberships.map((mem) => {
    const name = membershipNameMap[mem.membershipOrgId] || 'Unknown'
    const total = `$${mem.totalAmount}`

    return {
      id: mem.membershipOrgId,
      shortId: mem.membershipOrgId.substring(0, 3) + '...',
      org: name,
      total,
      interchange: '-',
      receivables: '-',
      paid: '-',
      unpaid: '-',
      inDispute: '-',
      status: '-',
      paymentDate: '-',
    }
  })

  if (!selectedMembership) {
    return (
      <section>
        <Header>
          <Title>Receivables</Title>
          <SearchBar placeholder="Search..." />
        </Header>
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
                <Td>
                  <Tooltip placement="top" title={item.id}>
                    {item.shortId}
                  </Tooltip>
                </Td>
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
        {memberships.length === 0 ? (
          <NoTransaction>No memberships available</NoTransaction>
        ) : (
          page.totalItem > ITEMS_PER_PAGE && (
            <PaginationFooter {...page} setPage={setPage} currPageCount={memberships.length} />
          )
        )}
      </section>
    )
  }

  return (
    <MembershipUsersList
      selectedMembership={selectedMembership}
      setSelectedMembership={setSelectedMembership}
    />
  )
}
