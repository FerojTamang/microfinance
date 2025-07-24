import React, { useState } from "react";
import Overview from "./Overview";
import Team from "./Team";
import Reports from "./Reports";

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Overview />
      <Team />
      <Reports />
      <Calculation /> {/* 👈 You can now include it here if you want */}
    </div>
  );
}

function Calculation() {
  const [count, setCount] = useState(0);

  const decreaseCount = () => {
    setCount(count - 1)
  }
  const increaseCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>+</button>
      <button onClick={decreaseCount}>-</button>
    </div>
  );
}

export default About;
export { Calculation };
