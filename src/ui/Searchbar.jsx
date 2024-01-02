import styled from "styled-components";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useEffect, useState } from "react";

const StyledSearchbar = styled.div`
  background-color: white;
  border: 1px solid var(--slate-200);
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 8px 1rem;
  gap: 10px;

  & input {
    border: none;
    outline: none;
    font-size: 16px;
    color: var(--slate-800);

    &::placeholder {
      color: var(--slate-400);
    }
  }

  &:focus-within {
    & svg {
      transition: color ease-in-out 200ms;
      color: var(--blue-500);
    }
  }

  & svg {
    font-size: 1.5rem;
    color: var(--slate-700);
    stroke-width: 2px;
  }
`;

function Searchbar({ value, onChange, onQuery, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(
    function () {
      function handleSearch(e) {
        if (e.key !== "Enter") return;
        onQuery();
      }

      value && isFocused && document.addEventListener("keypress", handleSearch);

      return () => document.removeEventListener("keypress", handleSearch);
    },
    [onQuery, isFocused, value]
  );

  return (
    <StyledSearchbar>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <HiOutlineMagnifyingGlass />
    </StyledSearchbar>
  );
}

export default Searchbar;
