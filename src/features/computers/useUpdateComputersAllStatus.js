import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAllUnavailable } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useUpdateComputersAllStatus() {
  const queryClient = useQueryClient();
  const { isPending: isUpdatingAllStatus, mutate: updateAllStatus } =
    useMutation({
      mutationFn: updateAllUnavailable,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["computers"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { isUpdatingAllStatus, updateAllStatus };
}
