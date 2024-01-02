import styled from "styled-components";

const TextArea = styled.textarea`
  border-radius: 8px;
  padding: 4px 8px;
  font-size: 15px;
  color: var(--slate-800);
  background-color: var(--slate-50);
  border: 1px solid var(--slate-200);

  resize: none;

  &::-webkit-scrollbar {
    display: none;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: var(--slate-100);
  }
  &:focus {
    outline: 2px solid var(--blue-500);
  }
`;

TextArea.defaultProps = {
  rows: "10",
  cols: "20",
};

export default TextArea;
