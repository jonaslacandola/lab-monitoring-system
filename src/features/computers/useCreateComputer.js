import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComputer } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useCreateComputer() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createComputer,
    onSuccess: () => {
      toast.success("Computer has been successfully added.");
      queryClient.invalidateQueries(["computers"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, create };
}
