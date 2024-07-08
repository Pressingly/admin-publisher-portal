import styled from "styled-components"

interface SummariesProps {
  summaryData: Summary[]
}

interface Summary {
  title: string
  value: string
}

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

export default function Summaries({ summaryData }: SummariesProps) {
  return (
    <SummaryContainer>
      {summaryData.map((item, index) => (
        <SummaryCard key={index}>
          <CardTitle>{item.title}</CardTitle>
          <CardValue>{item.value}</CardValue>
        </SummaryCard>
      ))}
    </SummaryContainer>
  )
}
