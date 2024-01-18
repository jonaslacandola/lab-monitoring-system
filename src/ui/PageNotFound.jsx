import { useNavigate } from "react-router";
import styled from "styled-components";

const StyledPageNotFound = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  gap: 10px;
`;

const GoBack = styled.span`
  color: var(--blue-500);
  cursor: pointer;
`;

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <StyledPageNotFound>
      <span>There seems to be a problem, page not found.</span>
      <GoBack onClick={() => navigate(-1, { replace: true })}>Go back</GoBack>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
