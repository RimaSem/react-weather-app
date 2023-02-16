import React, { useRef } from "react";

type SearchBarProps = {
  setCity: React.Dispatch<React.SetStateAction<string>>;
  errorRef: React.MutableRefObject<HTMLDivElement | null>;
};

function SearchBar({ setCity, errorRef }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (errorRef.current) {
      errorRef.current.style.display = "none";
    }
    if (inputRef.current) {
      setCity(inputRef.current.value);
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          name="search-input"
          placeholder="Search by city"
        />
        <button></button>
      </form>
    </div>
  );
}

export default SearchBar;
