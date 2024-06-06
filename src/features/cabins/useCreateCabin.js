import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertUpdateCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending } = useMutation({
    mutationFn: insertUpdateCabin,
    onSuccess: () => {
      toast.success("You've successfully add a new cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isPending };
}
