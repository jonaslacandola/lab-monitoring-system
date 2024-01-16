import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTimeOutSpecific } from "../../services/apiAttendances";
import toast from "react-hot-toast";

export function useTimeOutSpecific() {
  const queryClient = useQueryClient();
  const { isPending: isTimingOut, mutate: timeOutSpecific } = useMutation({
    mutationFn: updateTimeOutSpecific,
    onSuccess: () => {
      toast.success("Attendance has been timed out successfully.");
      queryClient.invalidateQueries(["currentAttendances"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isTimingOut, timeOutSpecific };
}
