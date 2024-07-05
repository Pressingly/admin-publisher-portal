import get from 'lodash/get'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Icon } from '~/components/designSystem'
import PaginationFooter from '~/components/subscriptionCharges/Pagination'
import { envGlobalVar } from '~/core/apolloClient'
import { fetchSubscriptionCharges } from '~/core/utils/request'

const { publisherRevenueApiUrl } = envGlobalVar()

interface SubscriptionCharge {
  amount: string
  currencyCode: string
  description: string
  id: string
  membershipOrgId: string
  membershipUserId: string
  status: string
  subscriptionInstanceId: string
  createdAt: string
  updatedAt: string
}

interface SubscriptionChargeView {
  id: string
  org: string
  total: string
  interchange: string
  receivables: string
  paid: string
  unpaid: string
  inDispute: string
  status: string
  paymentDate: string
}

const DashboardContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  font-size: 12px;
  color: #111928;
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

const Period = styled.p`
  margin-bottom: 20px;
`

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const SummaryCard = styled.div`
  border-radius: 10px;
  border: 0.5px solid #bfbfbf;
  gap: 8px;
  flex-shrink: 0;
  padding: 20px;
  text-align: center;
  width: 115px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.39);
`

const CardTitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 5px 0;
`

const CardValue = styled.p`
  font-size: 14px;
  margin: 0;
`

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

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`
const NoTransaction = styled.div`
  margin-top: 50px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #000000;
`

const statusMap: Record<string, string> = {
  inProgress: 'Pending',
  paid: 'Paid',
  unpaid: 'Unpaid',
}

const membershipNameMap: Record<string, string> = {
  '439db5bd-e607-4689-ad1d-6614a21927da': 'United Airlines',
}

const currencyMap: Record<string, string> = {
  USD: '$',
}

interface PaginationValue {
  currentPage: string
  totalItem: number
}

const ReceivablesDashboard = () => {
  const [subscriptionCharges, setSubscriptionCharges] = useState<SubscriptionCharge[]>([])
  const [page, setPage] = useState<PaginationValue>({ currentPage: '0', totalItem: 0 })
  const urlText = `${publisherRevenueApiUrl.toString()}subscription-charges`

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetchSubscriptionCharges(urlText)

        const subCharges = get(response, 'data.list', []) as SubscriptionCharge[]
        const curTotalItem = get(response, 'data.total', 0) as number

        setPage((prev) => ({ ...prev, totalItem: curTotalItem }))
        setSubscriptionCharges(subCharges)
      } catch (error) {
        console.error('Failed to fetch subscription charges:', error) // eslint-disable-line no-console
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetchSubscriptionCharges(urlText, page.currentPage)

        const subCharges = get(response, 'data.list', []) as SubscriptionCharge[]
        const curTotalItem = get(response, 'data.total', 0) as number

        setPage((prev) => ({ ...prev, totalItem: curTotalItem }))
        setSubscriptionCharges(subCharges)
      } catch (error) {
        console.error('Failed to fetch subscription charges:', error) // eslint-disable-line no-console
      }
    })()
  }, [page.currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const summaryData = [
    { title: 'Total amount', value: '$220.00' },
    { title: 'Interchange fee', value: '$20.00' },
    { title: 'In Dispute', value: '$0.00' },
    { title: 'Receivables', value: '$200.00' },
    { title: 'Paid amount', value: '$0.00' },
    { title: 'Unpaid amount', value: '$0.00' },
  ]
  const detailsData: SubscriptionChargeView[] = subscriptionCharges.map((item) => {
    const { id, membershipOrgId, amount, currencyCode, status } = item

    const total = `${currencyMap[currencyCode]}${amount}`
    const receivables = status === 'inProgress' ? total : '-'
    const stt = statusMap[status] || '-'
    const membershipName = membershipNameMap[membershipOrgId] || '-'

    return {
      id,
      org: membershipName,
      total,
      interchange: '-',
      receivables,
      paid: '-',
      unpaid: '-',
      inDispute: '-',
      status: stt,
      paymentDate: '-',
    }
  })

  return (
    <DashboardContainer>
      <Header>
        <Title>Receivables</Title>
        <SearchBar placeholder="Search..." />
      </Header>
      <Period>Period 01/08/2023 - 31/08/2023</Period>
      <SummaryContainer>
        {summaryData.map((item, index) => (
          <SummaryCard key={index}>
            <CardTitle>{item.title}</CardTitle>
            <CardValue>{item.value}</CardValue>
          </SummaryCard>
        ))}
      </SummaryContainer>
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
          {detailsData.map((item) => (
            <tr key={item.id}>
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
            </tr>
          ))}
        </tbody>
      </Table>
      {subscriptionCharges.length === 0 ? (
        <NoTransaction>No transaction available</NoTransaction>
      ) : (
        <PaginationFooter {...page} setPage={setPage} />
      )}
    </DashboardContainer>
  )
}

export default ReceivablesDashboard
