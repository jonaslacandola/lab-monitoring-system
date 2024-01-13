import { useEffect } from "react";
import { useUsersProvider } from "../features/users/UsersProvider";
import { useCurrentSession } from "../features/users/useCurrentSession";
import Spinner from "./Spinner";

function ReRouter({ children }) {
  const { user } = useUsersProvider();
  const { isFetchingSession, signIn } = useCurrentSession();

  useEffect(
    function () {
      if (!user) signIn();
    },
    [signIn, user]
  );

  if (isFetchingSession) return <Spinner />;

  if (!user && !isFetchingSession) return children;
}

export default ReRouter;
