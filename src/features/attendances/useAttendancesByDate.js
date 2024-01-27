import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAttendancesByDate } from "../../services/apiAttendances";

export function useAttendancesByDate() {
  const { isLoading: isLoadingAttendances, mutate: getAttendances } =
    useMutation({
      mutationFn: getAttendancesByDate,
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { isLoadingAttendances, getAttendances };
}
