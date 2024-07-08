import get from 'lodash/get'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { MembershipOrgsList } from '~/components/subscriptionCharges/MembershipOrgsList'
// import PaginationFooter from '~/components/subscriptionCharges/Pagination'
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

const DashboardContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  font-size: 12px;
  color: #111928;
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



// const NoTransaction = styled.div`
//   margin-top: 50px;
//   font-size: 14px;
//   font-weight: 600;
//   text-align: center;
//   color: #000000;
// `

// const statusMap: Record<string, string> = {
//   inProgress: 'Pending',
//   paid: 'Paid',
//   unpaid: 'Unpaid',
// }

// const membershipNameMap: Record<string, string> = {
//   '439db5bd-e607-4689-ad1d-6614a21927da': 'United Airlines',
// }

// const currencyMap: Record<string, string> = {
//   USD: '$',
// }

interface PaginationValue {
  currentPage: string
  totalItem: number
}

const Receivables = () => {
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

  // const membershipOrgsData: SubscriptionChargeView[] = subscriptionCharges.map((item) => {
  //   const { id, membershipOrgId, amount, currencyCode, status } = item

  //   const total = `${currencyMap[currencyCode]}${amount}`
  //   const receivables = status === 'inProgress' ? total : '-'
  //   const stt = statusMap[status] || '-'
  //   const membershipName = membershipNameMap[membershipOrgId] || '-'

  //   return {
  //     id,
  //     org: membershipName,
  //     total,
  //     interchange: '-',
  //     receivables,
  //     paid: '-',
  //     unpaid: '-',
  //     inDispute: '-',
  //     status: stt,
  //     paymentDate: '-',
  //   }
  // })

  const membershipOrgsData = [
    {
      id: '439db5bd-e607-4689-ad1d-6614a21927da',
      org: 'United Airlines',
      total: '-',
      interchange: '-',
      receivables: '-',
      paid: '-',
      unpaid: '-',
      inDispute: '-',
      status: '-',
      paymentDate: '-',
    },
  ]

  return (
    <DashboardContainer>
      <Header>
        <Title>Receivables</Title>
        <SearchBar placeholder="Search..." />
      </Header>
      <MembershipOrgsList membershipOrgsData={membershipOrgsData} />
    </DashboardContainer>
  )
}

export default Receivables
