import { useQuery } from "@tanstack/react-query";
import { apiTodaysActivity } from "../../services/apiBooking";

export default function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: apiTodaysActivity,
    queryKey: ["activity-today"],
  });

  return { isLoading, activities };
}
