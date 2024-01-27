import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendancesTimeOut } from "../../services/apiAttendances";
import toast from "react-hot-toast";

export function useUpdateTimeOut() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: timeOut } = useMutation({
    mutationFn: ({ timedOutAttendance, currentDate }) =>
      updateAttendancesTimeOut(timedOutAttendance, currentDate),
    onSuccess: () => {
      toast.success("Attendances has been successfully timed out.");
      queryClient.invalidateQueries(["currentAttendances"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, timeOut };
}
