import React from "react";

function Search(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={props.search}
      />
    </div>
  );
}

export default Search;
