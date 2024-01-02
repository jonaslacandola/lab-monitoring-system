import styled from "styled-components";

const DatePicker = styled.input`
  font-size: 16px;
  color: var(--slate-800);
  border: 1px solid var(--slate-800);
  border-radius: 8px;
  padding: 0 2rem;

  &:focus {
    outline-offset: 1px;
    outline: 2px solid var(--slate-600);
  }
`;

export default DatePicker;
