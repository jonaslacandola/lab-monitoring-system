import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComputer } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useUpdateSpecificComputer() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateComputer,
    onSuccess: () => {
      toast.success("Computer has been successfully updated.");
      queryClient.invalidateQueries(["computers"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, update };
}
