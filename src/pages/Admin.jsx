import CreateAdminForm from "../features/users/CreateAdminForm";
import { useUsersProvider } from "../features/users/UsersProvider";
import PageNotAvailable from "../ui/PageNotAvailable";

function Admin() {
  const { user } = useUsersProvider();

  if (user.role !== "administrator") return <PageNotAvailable />;

  if (user.role === "administrator")
    return (
      <>
        <h1>Admin</h1>
        <CreateAdminForm />
      </>
    );
}

export default Admin;
