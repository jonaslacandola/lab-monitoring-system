import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewLaboratory } from "../../services/apiLaboratories";
import toast from "react-hot-toast";

export function useCreateLaboratory() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createNewLaboratory,
    onSuccess: () => {
      toast.success("Laboratory has been successfuly added.");
      queryClient.invalidateQueries(["laboratories"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, create };
}
