import Button from './Button.jsx'

export default function Pagination({ page, totalPages, onPageChange }) {
  const isFirstPage = page <= 1
  const isLastPage = page >= totalPages

  return (
    <div className="pagination">
      <Button variant="ghost" disabled={isFirstPage} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      <p className="pagination__label">
        Page {page} of {totalPages}
      </p>
      <Button variant="ghost" disabled={isLastPage} onClick={() => onPageChange(page + 1)}>
        Next
      </Button>
    </div>
  )
}
