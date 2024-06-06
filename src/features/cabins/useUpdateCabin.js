import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertUpdateCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => insertUpdateCabin(newCabin, id),
    onSuccess: () => {
      toast.success("You've successfuly updated the cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () =>
      toast.error("Updating the cabin is failed please try again later"),
  });

  return { updateCabin };
}
