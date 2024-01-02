import { useQuery } from "@tanstack/react-query";
import { getLaboratories } from "../../services/apiLaboratories";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useLaboratories() {
  const {
    data: laboratories,
    isLoading: isLoadingLaboratories,
    error,
  } = useQuery({
    queryKey: ["laboratories"],
    queryFn: getLaboratories,
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
