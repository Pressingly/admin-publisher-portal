import styled from 'styled-components'

import { MembershipOrgsList } from '~/components/subscriptionCharges/MembershipOrgsList'

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

const Receivables = () => {
  return (
    <DashboardContainer>
      <Header>
        <Title>Receivables</Title>
        <SearchBar placeholder="Search..." />
      </Header>
      <MembershipOrgsList />
    </DashboardContainer>
  )
}

export default Receivables
