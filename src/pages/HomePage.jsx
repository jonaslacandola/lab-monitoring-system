import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";

const StyledHomePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  height: 100dvh;
  width: 100%;
  background-color: var(--gray-50);

  & p {
    color: var(--slate-700);
  }

  & button {
    width: 10rem;

    & span {
      font-size: 16px;
    }
  }
`;

function HomePage() {
  const navigate = useNavigate();

  function handleSignInStudent() {
    navigate("/student", { replace: true });
  }

  function handleSignInAdmin() {
    navigate("/admin", { replace: true });
  }

  return (
    <StyledHomePage>
      <p>Sign in as</p>
      <Button onClick={handleSignInStudent}>
        <span>Student</span>
      </Button>
      <Button onClick={handleSignInAdmin}>
        <span>Instructor</span>
      </Button>
      <Button onClick={handleSignInAdmin}>
        <span>Administrator</span>
      </Button>
    </StyledHomePage>
  );
}

export default HomePage;
