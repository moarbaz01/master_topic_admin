import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationControlProps = {
  page: number;
  limit?: number;
  total: number;
  onPageChange: (page: number) => void;
};

export default function PaginationControl({
  page,
  limit = 10,
  total,
  onPageChange,
}: PaginationControlProps) {
  const totalPages = Math.ceil(total / limit);

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(page - 1)}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <span className="text-sm text-muted-foreground px-2">
            Page {page} of {totalPages || 1}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(page + 1)}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
