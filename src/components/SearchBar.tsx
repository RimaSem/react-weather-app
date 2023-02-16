import React from "react";

function SearchBar() {
  return (
    <div className="search-bar">
      <form>
        <input type="text" name="search-input" placeholder="Search by city" />
        <button></button>
      </form>
    </div>
  );
}

export default SearchBar;
