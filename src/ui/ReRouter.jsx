import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUsersProvider } from "../features/users/UsersProvider";

function ReRouter({ children }) {
  const { user } = useUsersProvider();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (user) navigate("/admin", { replace: true });
    },
    [navigate, user]
  );

  if (!user) return children;
}

export default ReRouter;
