import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled, { css, keyframes } from "styled-components";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { useSearchParams } from "react-router-dom";

const StyledWindow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;

  display: flex;

  ${(props) =>
    props.position === "center" &&
    css`
      justify-content: center;
      align-items: center;

      animation: ${keyframes` 
        to {
         backdrop-filter: blur(2px);
        }
      `} 200ms ease-in-out forwards;

      & > * {
        max-height: 90dvh;
        transform: translateY(-5rem);

        &::-webkit-scrollbar {
          display: none;
        }

        animation: ${keyframes`
          to {
            transform: translateY(0);
          }
        `} 300ms ease-in-out forwards;
      }
    `}

  ${(props) =>
    props.position === "right" &&
    css`
      justify-content: flex-end;

      animation: ${keyframes` 
        to {
         backdrop-filter: blur(2px);
        }
      `} 200ms ease-in-out forwards;

      & > * {
        width: 5%;

        animation: ${keyframes`
          to {
            width: 35%;
          }
        `} 200ms ease-in-out forwards;
      }
    `}
`;

StyledWindow.defaultProps = {
  position: "center",
};

const Container = styled.div`
  background-color: white;
  overflow: scroll;

  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 2rem 2rem;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [, setSearchParams] = useSearchParams();
  const [openWindow, setOpenWindow] = useState("");

  function open(name) {
    setOpenWindow(name);
  }

  function close() {
    setOpenWindow("");
    setSearchParams("");
  }

  return (
    <ModalContext.Provider value={{ openWindow, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, window }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(window),
    onOpenModal: open,
  });
}

function Close({ children }) {
  const { close } = useContext(ModalContext);

  return cloneElement(children, { onClick: close });
}

function Window({ children, name, position }) {
  const { openWindow, close } = useContext(ModalContext);
  const ref = useRef();

  useOutsideClick(ref, close);

  if (openWindow !== name) return;

  return createPortal(
    <StyledWindow position={position}>
      <Container ref={ref}>
        {cloneElement(children, { onCloseModal: close })}
      </Container>
    </StyledWindow>,
    document.body
  );
}

Modal.Open = Open;
Modal.Close = Close;
Modal.Window = Window;

export default Modal;
