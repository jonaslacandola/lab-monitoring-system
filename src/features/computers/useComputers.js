import { useQuery } from "@tanstack/react-query";
import { getComputers } from "../../services/apiComputers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useComputers() {
  const [computers, setComputers] = useState();

  const {
    isLoading: isLoadingComputers,
    data,
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

  useEffect(
    function () {
      setComputers(data?.slice().sort((a, b) => a.computer - b.computer));
    },
    [data]
  );

  return { isLoadingComputers, computers };
}
