import React from "react";
import "./loader.css";
import { LeapFrog } from "@uiball/loaders";

function Loader(props) {
  return (
  <div className="position-absolute top-50 start-50 translate-middle">
    <LeapFrog size={140} speed={3} { ...props} />;
  </div>
  )
}

export default Loader;