import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

const ITEMS_PER_PAGE = 20

interface Page {
  totalItem: number
  currentPage: string
}

interface PaginationFooterProps extends Page {
  setPage: Dispatch<SetStateAction<Page>>
}

export default function PaginationFooter({
  totalItem,
  currentPage,
  setPage,
}: PaginationFooterProps) {
  const startIdx = Number(currentPage) * ITEMS_PER_PAGE + 1
  const endIdx = startIdx + 19

  function handlePreviousPage() {
    if (Number(currentPage) === 0) return
    setPage((prev: Page) => ({
      ...prev,
      currentPage: String(Number(prev.currentPage) - 1),
    }))
  }

  function handleNextPage() {
    if ((Number(currentPage) + 1) * ITEMS_PER_PAGE >= totalItem) return
    setPage((prev: Page) => ({
      ...prev,
      currentPage: String(Number(prev.currentPage) + 1),
    }))
  }

  const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  `

  const PageButtonGroup = styled.div`
    display: flex;
  `
  const PageButton = styled.button`
    padding: 5px 10px;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 0px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
    &:not(:last-child) {
      border-right: none;
    }
  `

  return (
    <Pagination>
      <span>
        Showing {startIdx}-{endIdx} of {totalItem}
      </span>
      <PageButtonGroup>
        <PageButton onClick={handlePreviousPage}>&lt;</PageButton>
        {/* <PageButton>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>...</PageButton>
        <PageButton>{Math.round(totalItem / ITEMS_PER_PAGE)}</PageButton> */}
        <PageButton onClick={handleNextPage}>&gt;</PageButton>
      </PageButtonGroup>
    </Pagination>
  )
}
