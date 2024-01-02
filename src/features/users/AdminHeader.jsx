import styled from "styled-components";
import { HiOutlineArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SignOutPrompt from "./SignOutPrompt";

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

function AdminHeader() {
  return (
    <StyledHeader>
      <p>Jonas Lacandola</p>
      <HeaderButton type="icon">
        <HiOutlineUser />
      </HeaderButton>
      <Modal>
        <Modal.Open window={"signOutPrompt"}>
          <HeaderButton type="icon">
            <HiOutlineArrowRightOnRectangle />
          </HeaderButton>
        </Modal.Open>
        <Modal.Window name={"signOutPrompt"}>
          <SignOutPrompt />
        </Modal.Window>
      </Modal>
    </StyledHeader>
  );
}

export default AdminHeader;
