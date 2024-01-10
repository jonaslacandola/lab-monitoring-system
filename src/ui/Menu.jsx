import styled from "styled-components";

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
    color: var(--slate-800);
    font-size: 15px;
    padding: 2px 8px;
    border-radius: 4px;
  }

  & > select {
    &:focus {
      outline: 2px solid var(--blue-500);
    }
  }

  & > button {
    transition: all ease-in-out 300ms;

    &:hover {
      background-color: var(--gray-100);
    }
    &:focus {
      outline: var(--blue-500);
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;

  & > svg {
    margin-left: 4px;
    color: var(--blue-500);
  }
`;

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

Menu.Button = Button;

export default Menu;
