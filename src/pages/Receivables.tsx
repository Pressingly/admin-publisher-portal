import styled from 'styled-components'

import { MembershipOrgsList } from '~/components/subscriptionCharges/MembershipOrgsList'

const DashboardContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  font-size: 12px;
  color: #111928;
`

const Receivables = () => {
  return (
    <DashboardContainer>
      <MembershipOrgsList />
    </DashboardContainer>
  )
}

export default Receivables
