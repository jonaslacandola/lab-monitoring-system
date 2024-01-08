import { HiArrowLeft, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useNavigate } from "react-router";
import styled from "styled-components";

const StyledPageNotFound = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & svg {
    font-size: 2.5rem;
    color: var(--yellow-400);
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: var(--slate-800);
  margin-top: 10px;
  cursor: pointer;

  & svg {
    color: var(--slate-800);
    font-size: 24px;
  }
`;

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <StyledPageNotFound>
      <HiOutlineExclamationTriangle />
      <p>There seems to be a problem, page not found.</p>
      <Button onClick={() => navigate(-1)}>
        <HiArrowLeft />
        <span>Go back</span>
      </Button>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
