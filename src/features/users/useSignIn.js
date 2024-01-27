import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { signInWithEmailAndPassword } from "../../services/apiUsers";
import { useUsersProvider } from "./UsersProvider";
import { signedIn } from "./usersActions";

export function useSignIn() {
  const { dispatch } = useUsersProvider();
  const navigate = useNavigate();

  const {
    isLoading: isSigningIn,
    mutate: signIn,
    error: signInError,
  } = useMutation({
    mutationFn: signInWithEmailAndPassword,
    onSuccess: (data) => {
      toast.success(
        `Successfully signed in. Welcome back ${data.at(0)?.firstName}!`
      );
      dispatch(signedIn(data.at(0)));
      navigate("/admin", { replace: true });
    },
  });

  return { isSigningIn, signIn, signInError };
}
