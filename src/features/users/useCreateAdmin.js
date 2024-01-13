import { useMutation } from "@tanstack/react-query";
import { createAdminWithEmailAndPassword } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useUsersProvider } from "./UsersProvider";
import { signedOut } from "./usersActions";

export function useCreateAdmin() {
  const { dispatch } = useUsersProvider();
  const navigate = useNavigate();

  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createAdminWithEmailAndPassword,
    onSuccess: () => {
      toast.success(
        "A confirmation link is sent to your email, please confirm your email before signing in."
      );
      dispatch(signedOut());
      navigate("/sign-in", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, create };
}
