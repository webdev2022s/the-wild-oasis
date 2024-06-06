import { useQuery } from "@tanstack/react-query";
import { getAPiSettings } from "../../services/apiSettng";

export default function useGetSettings() {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getAPiSettings,
  });

  return { isLoading, settings };
}
