import { useQuery } from "@tanstack/react-query";
import { getAvailableComputers } from "../../services/apiComputers";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useAvailableComputers() {
  const {
    data: computers,
    isLoading: isLoadingComputers,
    error,
  } = useQuery({
    queryKey: ["availableComputers"],
    queryFn: getAvailableComputers,
  });

  useEffect(
    function () {
      if (error) {
        toast.error(error.message);
      }
    },
    [error]
  );

  return { computers, isLoadingComputers };
}
