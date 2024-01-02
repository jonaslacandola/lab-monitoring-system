import { useEffect } from "react";
import { useUsersProvider } from "../features/users/UsersProvider";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const { user } = useUsersProvider();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user) navigate("/", { replace: true });
    },
    [navigate, user]
  );

  if (user) return children;
}

export default ProtectedRoute;
