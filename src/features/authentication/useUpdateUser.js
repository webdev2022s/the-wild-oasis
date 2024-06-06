import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "../../services/apiAuthencation";
import toast from "react-hot-toast";

export default function useUpdateuser() {
  const queryClient = useQueryClient();
  const { isPending, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      toast.success(`Successfully updated the user information`);
      queryClient.setQueryData(["users"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, updateUser };
}
