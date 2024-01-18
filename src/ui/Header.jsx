import styled from "styled-components";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router";

import Button from "./Button";

const StyledHeader = styled.header`
  padding: 0.8rem 4rem;
  border-bottom: 1px solid var(--gray-100);
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

const HeaderButton = styled(Button)`
  & svg {
    color: var(--blue-500);
  }
`;

function Header() {
  const navigate = useNavigate();

  function handleExit() {
    navigate("/", { replace: true });
  }

  return (
    <StyledHeader>
      <HeaderButton type="icon" onClick={handleExit}>
        <HiOutlineArrowRightOnRectangle />
      </HeaderButton>
    </StyledHeader>
  );
}

export default Header;
