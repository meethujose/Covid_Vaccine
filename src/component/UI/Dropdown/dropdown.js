import React from "react";
import "./dropdown.css";
function dropdown() {
  return (
    
<div class="select">
  <select name="slct" id="slct">
    <option selected disabled>Filter By</option>
    <option value="1">Pure CSS</option>
    <option value="2">No JS</option>
    <option value="3">Nice!</option>
  </select>
</div>
  );
}

export default dropdown;
