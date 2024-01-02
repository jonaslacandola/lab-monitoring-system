import { useMutation } from "@tanstack/react-query";
import { updateComputerStatus } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useUpdateComputer() {
  const { isPending: isUpdatingStatus, mutate: updateStatus } = useMutation({
    mutationFn: ({ computerId, status }) =>
      updateComputerStatus(computerId, status),
    onError: (error) => toast.error(error.message),
  });

  console.log(isUpdatingStatus);

  return { isUpdatingStatus, updateStatus };
}
