import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Button from "./Button";

const PopOverContext = createContext();

const Container = styled.div`
  position: relative;
`;

const StyledWindow = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  background-color: white;
  border: 1px solid var(--slate-200);
  border-radius: 8px;
  gap: 1rem;
  width: fit-content;

  position: absolute;
  right: 1rem;
  z-index: 100;
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
  transition: all ease-in-out 300ms;

  & span {
    color: ${(props) => props.color};
    font-size: 14px;
  }
  & svg {
    color: ${(props) => props.color};
    margin-right: 4px;
    font-size: 20px;
  }
  &:hover {
    background-color: var(--slate-50);
  }
`;

function PopOver({ children }) {
  const [openId, setOpenId] = useState("");

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <PopOverContext.Provider value={{ openId, open, close }}>
      {children}
    </PopOverContext.Provider>
  );
}

function Toggle({ Id, children }) {
  const { openId, open, close } = useContext(PopOverContext);

  function handleToggle() {
    openId === "" || openId !== Id ? open(Id) : close();
  }

  return cloneElement(children, { onClick: handleToggle });
}

function PopButton({ children, color, onEvent, onClick }) {
  const { close } = useContext(PopOverContext);

  function handleClick() {
    close();
    onEvent?.();
    onClick?.();
  }

  return (
    <StyledButton type="icon" color={color} onClick={handleClick}>
      {children}
    </StyledButton>
  );
}

function Window({ children, Id }) {
  const { openId, close } = useContext(PopOverContext);
  const ref = useRef();

  useOutsideClick(ref, close);

  if (openId !== Id) return;

  return <StyledWindow ref={ref}>{children}</StyledWindow>;
}

PopOver.Toggle = Toggle;
PopOver.Window = Window;
PopOver.Container = Container;
PopOver.PopButton = PopButton;

export default PopOver;
