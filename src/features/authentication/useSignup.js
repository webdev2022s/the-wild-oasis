import { useMutation } from "@tanstack/react-query";
import { SignUp as apiSignup } from "../../services/apiAuthencation";
import toast from "react-hot-toast";

export default function useSignup() {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: apiSignup,
    onSuccess: (data) =>
      toast.success(`Account is created please check your emall `),
    onError: (err) => err.message,
  });

  return { isPending, signup };
}
