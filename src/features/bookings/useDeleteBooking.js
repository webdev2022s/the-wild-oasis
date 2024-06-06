import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteBooking } from "../../services/apiBooking";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deletingBooking } = useMutation({
    mutationFn: apiDeleteBooking,
    onSuccess: () => {
      toast.success(`You've successfully deleted the cabin`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deletingBooking };
}
