import { useState } from "react";
import { getStudentById } from "../../services/apiStudents";
import toast from "react-hot-toast";

export function useStudentById() {
  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function getStudent(ID) {
    if (!ID) return;
    try {
      setError("");
      setIsLoading(true);
      const { data } = await getStudentById(ID);
      setStudent(data);
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { student, isLoading, error, getStudent };
}
