import React, { useState } from "react";
import "./App.css"; // For styling

function App() {
  const [color, setColor] = useState("black");

  const changeColor = () => {
    const newColor = color === "black" ? "blue" : "black"; 
    setColor(newColor);
  };

  const resetColor = () => {
    setColor("black"); // Reset to default black
  };

  return (
    <div className="App">
      <div
        className="square"
        style={{ backgroundColor: color, width: "100px", height: "100px" }}
      ></div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={changeColor}>Change Color</button>
        <button onClick={resetColor} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
