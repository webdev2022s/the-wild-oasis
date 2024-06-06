import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin, getCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isdle: isDeleting, mutate: deletingCabin } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("You deleted a cabin successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
        queryFn: getCabin,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletingCabin };
}
