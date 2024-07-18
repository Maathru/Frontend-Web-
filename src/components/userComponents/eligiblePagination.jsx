import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const EligiblePagination = ({ current, total }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={current === 1 ? "#" : `/eligible/${current - 1}`}
          />
        </PaginationItem>
        {[...Array(total).keys()].map((_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                to={`/eligible/${page}`}
                isActive={current === page}
                disabled={1}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            to={current === total ? "#" : `/eligible/${current + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default EligiblePagination;
