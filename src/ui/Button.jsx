import styled, { css } from "styled-components";

const Button = styled.button`
  ${(props) =>
    props.type === "primary" &&
    css`
      padding: 0.5rem 1rem;
      background-color: var(--slate-800);
      border: 1px solid var(--slate-300);
      border-radius: 8px;
      color: var(--slate-50);
      font-size: 14px;
      max-width: 25%;
      transition: all ease-in-out 300ms;
      cursor: pointer;

      &:hover {
        color: var(--slate-400);
      }
      &:focus {
        outline-offset: 2px;
        outline: 2px solid var(--blue-500);
      }
      &:disabled {
        cursor: not-allowed;
        background-color: var(--slate-700);
        color: var(--slate-400);
      }
    `}

  ${(props) =>
    props.type === "icon" &&
    css`
      display: flex;
      align-items: center;
      gap: 5px;
      background-color: transparent;
      border-radius: 50px;
      padding: 4px;
      border: none;
      cursor: pointer;

      & span {
        font-size: 16px;
        padding-bottom: 2px;
        color: var(--slate-800);
      }
      & svg {
        font-size: 24px;
        color: var(--slate-800);
      }
      &:focus {
        outline: 2px solid var(--blue-500);
        outline-offset: 2px;
      }
    `}
`;

Button.defaultProps = {
  type: "primary",
};

export default Button;
