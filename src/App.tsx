import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherContainer from "./components/WeatherContainer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <SearchBar />
      <div className="error-message">City not found</div>
      <WeatherContainer />
    </div>
  );
}

export default App;
