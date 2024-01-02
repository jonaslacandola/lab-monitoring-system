import { useQuery } from "@tanstack/react-query";
import { getAttendancesByDate } from "../../services/apiAttendances";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useAttendancesByCurrentDate() {
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const {
    data: currentAttendances,
    error,
    isLoading: isLoadingCurrentAttendances,
  } = useQuery({
    queryKey: ["currentAttendances"],
    queryFn: () => getAttendancesByDate(currentDate),
  });

  useEffect(
    function () {
      if (error) {
        toast.error(error.message);
      }
    },
    [error]
  );

  return { currentAttendances, isLoadingCurrentAttendances };
}
