import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComputerById } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useDeleteComputerById() {
  const queryClient = useQueryClient();
  const { isLoading: isDeletingComputer, mutate: deleteComputer } = useMutation(
    {
      mutationFn: ({ computerId, laboratories }) =>
        deleteComputerById(computerId, laboratories),
      onSuccess: () => {
        toast.success("Computer has been successfully deleted");
        queryClient.invalidateQueries(["computers"]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  return { isDeletingComputer, deleteComputer };
}
