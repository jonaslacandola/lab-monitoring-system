import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useUsersProvider } from "./UsersProvider";
import { useNavigate } from "react-router";
import { signedIn } from "./usersActions";

export function useSignIn() {
  const { dispatch } = useUsersProvider();
  const navigate = useNavigate();

  const {
    isPending: isSigningIn,
    mutate: signIn,
    error: signInError,
  } = useMutation({
    mutationFn: signInWithEmailAndPassword,
    onSuccess: (data) => {
      toast.success("Successfully signed in. Welcome back.");
      dispatch(signedIn(data.user));
      navigate("/admin", { replace: true });
    },
  });

  return { isSigningIn, signIn, signInError };
}
