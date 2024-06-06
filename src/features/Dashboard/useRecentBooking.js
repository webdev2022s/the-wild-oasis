import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { apiRecentBookingByAfterDate } from "../../services/apiBooking";

export default function useRecentBooking() {
  const [searchParams] = useSearchParams();

  const lastRecentDate = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), lastRecentDate).toISOString();

  const { isLoading, data: recentBookingByLastDate } = useQuery({
    queryKey: ["bookings", `last-${lastRecentDate}`],
    queryFn: () => apiRecentBookingByAfterDate(queryDate),
  });

  return { isLoading, recentBookingByLastDate };
}
