import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabin";

export default function useCabin() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });

  return { isLoading, cabins };
}
