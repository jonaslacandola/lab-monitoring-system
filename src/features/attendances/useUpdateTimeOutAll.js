import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentAttendancesTimeOut } from "../../services/apiAttendances";
import toast from "react-hot-toast";

export function useUpdateTimeOutAll() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateTimeOut } = useMutation({
    mutationFn: ({ currentTime, currentDate }) =>
      updateCurrentAttendancesTimeOut(currentTime, currentDate),
    onSuccess: () => {
      toast.success("Attendances has been successfully timed out.");
      queryClient.invalidateQueries(["currentAttendances"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateTimeOut };
}
