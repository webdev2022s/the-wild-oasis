import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateBooking } from "../../services/apiBooking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateBooking, isPending: isChecking } = useMutation({
    mutationFn: ({ bookingDetailsById, updateBreakfastPrice }) =>
      apiUpdateBooking(bookingDetailsById.id, {
        status: "check-in",
        isPaid: true,
        ...updateBreakfastPrice,
      }),
    onSuccess: (data) => {
      toast.success(`You've successfully updated the cabin ${data.id}`);
      queryClient.invalidateQueries({ active: true });
      navigate(`/`);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateBooking, isChecking };
}
