import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const pagination = () => {
  return (
    <div className="md:mt-12 mt-8 w-auto">
      <Pagination>
        <PaginationContent>

          <div className="flex items-center justify-between w-[95vw] py-4">

            <div className="">
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
            </div>

            <div className="hidden md:flex">
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">8</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">9</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
            </div>

            <div className="">
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </div>
            
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default pagination;
