import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { apiStayAfterDate } from "../../services/apiBooking";

export default function useRecentStay() {
  const [searchParams] = useSearchParams();
  const numStay = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryStay = subDays(new Date(), numStay).toISOString();

  const { isLoading, data: dataStays } = useQuery({
    queryKey: ["stays", `last-${numStay}`],
    queryFn: () => apiStayAfterDate(queryStay),
  });

  const filteredStay = dataStays?.filter(
    (data) => data.status === "check-out" || data.status === "check-in"
  );

  return { isLoading, numStay, filteredStay };
}
