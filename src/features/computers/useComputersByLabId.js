import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getComputersByLaboratoryId } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useComputersByLabId(laboratoryId) {
  const {
    isLoading: isLoadingComputers,
    data: computers,
    error,
  } = useQuery({
    queryKey: [`computers-${laboratoryId}`],
    queryFn: () => getComputersByLaboratoryId(laboratoryId),
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
