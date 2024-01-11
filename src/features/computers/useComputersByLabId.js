import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getComputersByLaboratoryId } from "../../services/apiComputers";
import toast from "react-hot-toast";

export function useComputersByLabId(laboratoryId) {
  const [computers, setComputers] = useState([]);
  const {
    isLoading: isLoadingComputers,
    data,
    error,
  } = useQuery({
    queryKey: ["computers"],
    queryFn: () => getComputersByLaboratoryId(laboratoryId),
  });

  useEffect(
    function () {
      setComputers(data?.slice().sort((a, b) => a.computer - b.computer));
    },
    [data]
  );

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
