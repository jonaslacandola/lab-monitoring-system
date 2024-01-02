import { useQuery } from "@tanstack/react-query";
import { getAttendances } from "../../services/apiAttendances";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useAttendances() {
  const {
    data: attendances,
    isLoading: isLoadingAttendances,
    error,
  } = useQuery({
    queryKey: ["attendances"],
    queryFn: getAttendances,
  });

  useEffect(
    function () {
      if (error) {
        toast.error(error.message);
      }
    },
    [error]
  );

  return { attendances, isLoadingAttendances };
}
