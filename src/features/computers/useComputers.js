import { useQuery } from "@tanstack/react-query";
import { getComputers } from "../../services/apiComputers";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function useComputers() {
  const {
    isLoading: isLoadingComputers,
    data: computers,
    error,
  } = useQuery({
    queryKey: ["computers"],
    queryFn: getComputers,
  });

  useEffect(
    function () {
      if (error) {
        toast.error(error.message);
      }
    },
    [error]
  );

  return { isLoadingComputers, computers };
}
