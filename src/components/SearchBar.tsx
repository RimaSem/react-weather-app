import React from "react";

type SearchBarProps = {
  setCity: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ setCity }: SearchBarProps) {
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
