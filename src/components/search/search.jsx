import React from "react";
import "./search.css";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ setQuery, ...props }) => {
  const debounced = useDebouncedCallback((value) => {
    setQuery(value);
  }, 300);
  //Дебаунс ограничивает количество запросов на сервер

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(text) => debounced(text.target.value)}
      />
    </div>
  );
};

export default Search;
