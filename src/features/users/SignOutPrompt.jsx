import { useNavigate } from "react-router";
import styled from "styled-components";

import { signOutUserAndSession } from "../../services/apiUsers";
import { useUsersProvider } from "./UsersProvider";
import { signedOut } from "./usersActions";

const StyledSignOutPrompt = styled.div`
  width: 20vw;

  & p {
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  margin-right: 1rem;
  cursor: pointer;
`;

const Confirm = styled(Button)`
  color: var(--blue-500);
`;

const Cancel = styled(Button)`
  color: var(--red-500);
`;

function SignOutPrompt({ onCloseModal }) {
  const { dispatch } = useUsersProvider();
  const navigate = useNavigate();

  function handleSignOut() {
    dispatch(signedOut());
    signOutUserAndSession();
    navigate("/", { replace: true });
  }

  return (
    <StyledSignOutPrompt>
      <p>Are you sure you want to sign out?</p>
      <Cancel onClick={onCloseModal}>Go back</Cancel>
      <Confirm onClick={handleSignOut}>Continue</Confirm>
    </StyledSignOutPrompt>
  );
}

export default SignOutPrompt;
