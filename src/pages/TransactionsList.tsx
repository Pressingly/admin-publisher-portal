import styled from 'styled-components'

import { Typography } from '~/components/designSystem'
import { useInternationalization } from '~/hooks/core/useInternationalization'
import { ListContainer, ListHeader, PageHeader, theme } from '~/styles'
import useGetTransactions from '~/hooks/transactions/useGetTransaction'

const TransactionsList = () => {
  const { translate } = useInternationalization()

  const { transactions, loading: isLoading, error: error } = useGetTransactions()

  return (
    <div role='grid' tabIndex={-1}>
      <Header $withSide>
        <Typography variant='bodyHl' color='textSecondary' noWrap>
          {translate('text_63ac86de97f728a87b2f9f85')}
        </Typography>
      </Header>

      <ListContainer>
        <ListHead $withActions>
          <PlanNameSection>
            <Typography color='disabled' variant='bodyHl'>
              {translate('text_62442e40cea25600b0b6d852')}
            </Typography>
          </PlanNameSection>
          <PlanInfosSection>
            <MediumCell color='disabled' variant='bodyHl'>
              {translate('text_62d95e42c1e1dfe7376fdf35')}
            </MediumCell>
            <SmallCell color='disabled' variant='bodyHl'>
              {translate('text_62442e40cea25600b0b6d856')}
            </SmallCell>
            <MediumCell color='disabled' variant='bodyHl'>
              {translate('text_62442e40cea25600b0b6d858')}
            </MediumCell>
          </PlanInfosSection>
        </ListHead>

      </ListContainer>
    </div>
  )
}

const Header = styled(PageHeader)`
    > * {
        white-space: pre;

        &:first-child {
            margin-right: ${theme.spacing(4)};
        }
    }
`

const ListHead = styled(ListHeader)`
    justify-content: space-between;
`

const MediumCell = styled(Typography)`
    text-align: right;
    width: 118px;
`

const SmallCell = styled(Typography)`
    text-align: right;
    width: 80px;
`

const PlanNameSection = styled.div`
    margin-right: auto;
    display: flex;
    align-items: center;
    min-width: 0;
`

const PlanInfosSection = styled.div`
    display: flex;

    > *:not(:last-child) {
        margin-right: ${theme.spacing(6)};

        ${theme.breakpoints.down('md')} {
            display: none;
        }
    }
`

export default TransactionsList
