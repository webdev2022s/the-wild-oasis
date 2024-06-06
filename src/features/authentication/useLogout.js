import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout as apiLogout } from "../../services/apiAuthencation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      toast.success("Good Bye");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, logout };
}
