import { useMutation } from "@tanstack/react-query";
import { createStudentAttendance } from "../../services/apiAttendances";
import toast from "react-hot-toast";

export function useCreateAttendance() {
  const { isPending: isCreating, mutate: createAttendance } = useMutation({
    mutationFn: createStudentAttendance,
    onSuccess: () => {
      toast.success("Attendance successfully recorded.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createAttendance };
}
