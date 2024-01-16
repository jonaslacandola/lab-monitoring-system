import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLaboratoryById } from "../../services/apiLaboratories";
import toast from "react-hot-toast";

export function useUpdateLaboratoryById() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updateLaboratoryById,
    onSuccess: () => {
      toast.success("Laboratory has been successfully updated.");
      queryClient.invalidateQueries(["laboratories"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, update };
}
