import styled from "styled-components";

const StyledPrompt = styled.div`
  width: 25vw;

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

function ConfirmDelete({ children, onCloseModal, onConfirm }) {
  function handleConfirm() {
    onConfirm?.();
  }
  return (
    <StyledPrompt>
      {children}
      <Cancel onClick={onCloseModal}>Cancel</Cancel>
      <Confirm onClick={handleConfirm}>Continue</Confirm>
    </StyledPrompt>
  );
}

export default ConfirmDelete;
