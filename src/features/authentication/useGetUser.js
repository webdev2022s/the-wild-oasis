import { useQuery } from "@tanstack/react-query";
import { apiCurrentUser } from "../../services/apiAuthencation";

export default function useGetUser() {
  const { isLoading, data: currentUser } = useQuery({
    queryKey: ["users"],
    queryFn: apiCurrentUser,
  });

  return {
    isLoading,
    currentUser,
    defaultEmail: currentUser?.email,
    isAuthenticated: currentUser?.role === "authenticated",
  };
}
