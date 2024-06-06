import { useMutation } from "@tanstack/react-query";
import { apiResetPasswordorEmail } from "../../services/apiAuthencation";
import toast from "react-hot-toast";

export default function useResetPassword() {
  const { isPending, mutate: resetPassword } = useMutation({
    mutationFn: ({ email }) => apiResetPasswordorEmail({ email }),
    onSuccess: () =>
      toast.success(`Successfully reset email please check your email`),
    onError: (err) => toast.error(err.message),
  });
  return { isPending, resetPassword };
}
