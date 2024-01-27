import { useMutation } from "@tanstack/react-query";
import { updateComputerStatus } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useUpdateComputer() {
  const { isLoading: isUpdatingStatus, mutate: updateStatus } = useMutation({
    mutationFn: ({ computerId, status }) =>
      updateComputerStatus(computerId, status),
    onError: (error) => toast.error(error.message),
  });

  return { isUpdatingStatus, updateStatus };
}
