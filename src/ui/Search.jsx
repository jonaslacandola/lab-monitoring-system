import { useNavigate } from "react-router";
import { useState } from "react";
import Searchbar from "./Searchbar";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleQuery() {
    setSearchParams({ studentId: query });
    console.warn(
      `Search query on previous searched: useUseParams queried in studentId=${searchParams.get(
        "studentId"
      )}`
    );
  }

  function handleQueryChange(e) {
    const { value } = e.target;
    if (!value) {
      navigate("/attendance");
    }
    setQuery(value);
  }

  return (
    <Searchbar
      placeholder={"Search student Id"}
      value={query}
      onChange={handleQueryChange}
      onQuery={handleQuery}
    />
  );
}

export default Search;
