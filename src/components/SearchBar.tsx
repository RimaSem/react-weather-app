import React, { useRef } from "react";

interface SearchBarProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setCity }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <button aria-label="Search button"></button>
      </form>
    </div>
  );
};

export default SearchBar;
