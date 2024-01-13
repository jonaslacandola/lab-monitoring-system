import { useMutation } from "@tanstack/react-query";
import { getUserSession } from "../../services/apiUsers";

import { useUsersProvider } from "./UsersProvider";
import { signedIn } from "./usersActions";
import { useNavigate } from "react-router";

export function useCurrentSession() {
  const navigate = useNavigate();
  const { dispatch } = useUsersProvider();
  const { isPending: isFetchingSession, mutate: signIn } = useMutation({
    mutationFn: getUserSession,
    onSuccess: (data) => {
      dispatch(signedIn(data.at(0)));
      navigate("/admin");
    },
  });
  return { isFetchingSession, signIn };
}
