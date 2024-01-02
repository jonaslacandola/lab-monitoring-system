import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const MiniSpinner = styled(BiLoaderAlt)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--blue-500);
  animation: ${rotate} 800ms infinite linear;
`;

export default MiniSpinner;
