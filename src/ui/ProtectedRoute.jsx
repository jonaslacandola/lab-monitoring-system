import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUsersProvider } from "../features/users/UsersProvider";

function ProtectedRoute({ children }) {
  const { user } = useUsersProvider();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user) navigate("/sign-in", { replace: true });
    },
    [navigate, user]
  );

  if (user) return children;
}

export default ProtectedRoute;
