import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const StyledSpinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100%;
  height: 100dvh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerIcon = styled(BiLoaderAlt)`
  color: var(--blue-500);
  font-size: 5rem;
  animation: ${keyframes`to { transform: rotate(1turn)}`} 1s infinite linear;
`;

function Spinner() {
  return (
    <StyledSpinner>
      <SpinnerIcon />
    </StyledSpinner>
  );
}

export default Spinner;
