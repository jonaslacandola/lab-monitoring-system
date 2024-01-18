import { useNavigate } from "react-router";
import { useState } from "react";
import Searchbar from "./Searchbar";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleQuery() {
    setSearchParams({ student: query });
  }

  function handleQueryChange(e) {
    const { value } = e.target;
    if (!value) {
      navigate("/student/attendance");
    }
    setQuery(value);
  }

  return (
    <Searchbar
      placeholder={"Search student"}
      value={query}
      onChange={handleQueryChange}
      onQuery={handleQuery}
    />
  );
}

export default Search;
