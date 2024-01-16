import styled from "styled-components";

const Select = styled.select`
  padding: 4px 1rem;
  background-color: var(--slate-50);
  border: 1px solid var(--slate-200);
  border-radius: 4px;
  color: var(--slate-800);
  font-size: 14px;

  &:focus {
    outline-offset: 1px;
    outline: 2px solid var(--blue-500);
  }
  &:disabled {
    cursor: not-allowed;
    background-color: var(--slate-100);
  }
  & option:disabled {
    color: var(--slate-400);
  }
`;

export default Select;
