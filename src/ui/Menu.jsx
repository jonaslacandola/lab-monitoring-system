import styled, { css } from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  padding: 4px 4px;
  gap: 4px;

  & > * {
    background-color: transparent;
    border: none;
    font-size: 15px;
    padding: 2px 8px;
    border-radius: 4px;
  }

  & > select {
    &:focus {
      outline: 2px solid var(--blue-500);
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  transition: all ease-in-out 300ms;

  &:hover {
    background-color: var(--blue-500);
    color: white;
  }
  &:focus {
    outline: var(--blue-500);
  }
  & svg {
    margin-left: 4px;
    color: var(--blue-500);
  }
  &:hover svg {
    color: white;
  }

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--blue-500);
      color: white;
    `}
`;

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

Menu.Button = Button;

export default Menu;
