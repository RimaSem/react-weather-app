import React, { useRef } from "react";

interface SearchBarProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
  errorRef: React.MutableRefObject<HTMLDivElement | null>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setCity, errorRef }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorRef.current) {
      errorRef.current.style.display = "none";
    }
    if (inputRef.current) {
      setCity(inputRef.current.value);
    }
  };

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
};

export default SearchBar;
