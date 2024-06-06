import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAPiSettings } from "../../services/apiSettng";
import toast from "react-hot-toast";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending } = useMutation({
    mutationFn: updateAPiSettings,
    onSuccess: () => {
      toast.success("You've successfully updated the settings");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isPending };
}
