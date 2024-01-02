import { useState } from "react";
import toast from "react-hot-toast";
import { getAvailableComputersByLaboratoryId } from "../../services/apiComputers";

export function useComputersByLabId() {
  const [computers, setComputers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function getComputers(ID) {
    if (!ID) return;
    try {
      setError("");
      setIsLoading(true);
      const data = await getAvailableComputersByLaboratoryId(ID);
      setComputers(data);
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { computers, isLoading, error, getComputers };
}
