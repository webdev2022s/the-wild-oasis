import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as apiLogin } from "../../services/apiAuthencation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate: userLogin } = useMutation({
    mutationFn: ({ email, password }) => apiLogin({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], data.user);
      toast.success(`Welcome ${data.user.email.split("@").at(0)}`);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, userLogin };
}
