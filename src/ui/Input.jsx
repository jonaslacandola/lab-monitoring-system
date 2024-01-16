import styled from "styled-components";

const Input = styled.input`
  padding: 6px 0.8rem;
  background-color: var(--slate-50);
  border: 1px solid var(--slate-200);
  border-radius: 4px;
  color: var(--slate-800);
  font-size: 14px;
  flex-grow: 1;

  &:focus {
    outline: 2px solid var(--blue-500);
  }
  &::placeholder {
    color: var(--slate-300);
  }
  &:disabled {
    cursor: not-allowed;
    background-color: var(--slate-100);
    color: var(--slate-800);
  }
`;

export default Input;
