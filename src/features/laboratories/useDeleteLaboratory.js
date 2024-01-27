import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLaboratoryById } from "../../services/apiLaboratories";
import toast from "react-hot-toast";

export function useDeleteLaboratory() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteLaboratory } = useMutation({
    mutationFn: ({ laboratoryId, imageURL }) =>
      deleteLaboratoryById(laboratoryId, imageURL),
    onSuccess: () => {
      toast.success("Laboratory has been successfully deleted.");
      queryClient.invalidateQueries(["laboratories"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteLaboratory };
}
