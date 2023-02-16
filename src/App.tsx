import { useState } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <SearchBar />
    </div>
  );
}

export default App;
