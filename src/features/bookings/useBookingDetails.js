import { useQuery } from "@tanstack/react-query";
import { apiGetBookingDetailsById } from "../../services/apiBooking";
import { useParams } from "react-router-dom";

export default function useBookingDetails() {
  const { bookingId } = useParams();
  const { isLoading, data: bookingDetailsById } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => apiGetBookingDetailsById(bookingId),
    retry: false,
  });
  return { isLoading, bookingDetailsById };
}
