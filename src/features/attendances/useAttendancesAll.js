import { useQuery } from "@tanstack/react-query";
import { getAttendanceWithStudentLaboratoryComputer } from "../../services/apiAttendances";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useAttendancesAll() {
  const {
    data: attendancesAll,
    isLoading: isLoadingAttendancesAll,
    error,
  } = useQuery({
    queryKey: ["attendances"],
    queryFn: getAttendanceWithStudentLaboratoryComputer,
  });

  useEffect(
    function () {
      if (error) {
        toast.error(error.message);
      }
    },
    [error]
  );

  return { attendancesAll, isLoadingAttendancesAll };
}
