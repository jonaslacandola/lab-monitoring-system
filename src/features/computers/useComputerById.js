import { useMutation } from "@tanstack/react-query";
import { getComputerById } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useComputerById() {
  const { isPending: isFetchingComputer, mutate: fetchComputer } = useMutation({
    mutationFn: getComputerById,
    onSuccess: () => {
      toast.success("Computer successfully retrieved");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isFetchingComputer, fetchComputer };
}
