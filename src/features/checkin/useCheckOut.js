import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateBooking } from "../../services/apiBooking";
import toast from "react-hot-toast";

export default function useCheckOut() {
  const queryClient = useQueryClient();
  const { isPending: isCheckOut, mutate: updateBookingCheckOut } = useMutation({
    mutationFn: (booking) =>
      apiUpdateBooking(booking.id, {
        status: "check-out",
      }),
    onSuccess: (data) => {
      toast.success(`You Check-Out the cabin ${data.id} `);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCheckOut, updateBookingCheckOut };
}
