import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBooking";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export default function useBooking() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //Filter
  const filterValue = searchParams.get("status");
  const filterData =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  //Sort
  const sortValue = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  //Pagination
  const pageData = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  // Query
  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filterData, sortBy, pageData],
    queryFn: () => getBooking({ filterData, sortBy, pageData }),
  });
  // Pre Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (pageData < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterData, sortBy, pageData + 1],
      queryFn: () => getBooking({ filterData, sortBy, pageData: pageData + 1 }),
    });

  if (pageData > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterData, sortBy, pageData - 1],
      queryFn: () => getBooking({ filterData, sortBy, pageData: pageData - 1 }),
    });
  return { data, isLoading, count };
}
