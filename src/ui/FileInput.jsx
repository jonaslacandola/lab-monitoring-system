import styled from "styled-components";
import Input from "./Input";

const FileInput = styled(Input).attrs({ type: "file" })`
  &::file-selector-button {
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    color: white;
    font-weight: 500;
    background-color: var(--blue-500);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--blue-400);
    }
  }
`;

export default FileInput;
