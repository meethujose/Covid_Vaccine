import React from "react";
import "./Search.css";
import MarkertImg from "../../Images/market-research.png";

var filteredElements = [];
export default function Search({ userArray, setUserArray, setMount }) {
  const searchRef = React.useRef();

  var oldData = userArray;
  const handleChange = () => {
    filteredElements = userArray.filter((e) =>
      e.name.toLowerCase().includes(searchRef.current.value.toLowerCase())
    );
    if (searchRef.current.value.length === 0) {
      setMount(true);
    } else {
      setUserArray(filteredElements);
    }
  };
  return (
    <div className="search-box">
      <input
        className="search-input "
        type="text"
        name=""
        placeholder="Search......"
        onChange={handleChange}
        ref={searchRef}
      />
      <a className="search-btn">
        <i className="fas fa-search"></i>
      </a>
    </div>
  );
}
