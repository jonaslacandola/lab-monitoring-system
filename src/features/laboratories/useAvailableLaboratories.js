import { useQuery } from "@tanstack/react-query";
import { getAvailableLaboratories } from "../../services/apiLaboratories";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useAvailableLaboratories() {
  const {
    data: laboratories,
    isLoading: isLoadingLaboratories,
    error,
  } = useQuery({
    queryKey: ["availableLaboratories"],
    queryFn: getAvailableLaboratories,
  });

  useEffect(
    function () {
      if (error) {
        toast.error(error.message);
      }
    },
    [error]
  );

  return { laboratories, isLoadingLaboratories };
}
