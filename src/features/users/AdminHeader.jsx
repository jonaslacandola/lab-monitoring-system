import styled from "styled-components";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import PopOver from "../../ui/PopOver";
import SignOutPrompt from "./SignOutPrompt";
import { useUsersProvider } from "./UsersProvider";

const StyledHeader = styled.header`
  padding: 0.8rem 4rem;
  border-bottom: 1px solid var(--gray-100);
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

const HeaderButton = styled(Button)`
  padding: 0;
  margin-right: 8px;

  & span {
    font-size: 15px;
  }
  & svg {
    font-size: 20px;
    color: var(--blue-500);
  }
`;

const Img = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 100%;
  border: 1px solid var(--blue-500);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SubText = styled.p`
  font-size: 12px;
  color: var(--slate-400);
`;

function AdminHeader() {
  const { user } = useUsersProvider();

  return (
    <PopOver>
      <StyledHeader>
        <Modal>
          <PopOver.Container>
            <PopOver.Toggle Id={"signIn"}>
              <Container>
                <Img src={user.pfpURL} />
                <TextContainer>
                  <p>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <SubText>{user.adminEmail}</SubText>
                </TextContainer>
              </Container>
            </PopOver.Toggle>
            <PopOver.Window Id={"signIn"}>
              <Modal.Open window={"signOutPrompt"}>
                <HeaderButton type="icon">
                  <HiOutlineArrowLeftOnRectangle />
                  <span>Sign out</span>
                </HeaderButton>
              </Modal.Open>
            </PopOver.Window>
          </PopOver.Container>

          <Modal.Window name={"signOutPrompt"}>
            <SignOutPrompt />
          </Modal.Window>
        </Modal>
      </StyledHeader>
    </PopOver>
  );
}

export default AdminHeader;
