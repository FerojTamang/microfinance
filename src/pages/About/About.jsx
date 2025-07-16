import React from "react";
import Overview from "./Overview";
import Team from "./Team";
import Reports from "./Reports";

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Overview/>
      <Team/>
      <Reports/>
    </div>
  );
}

export default About;
