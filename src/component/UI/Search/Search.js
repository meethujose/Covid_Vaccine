import React from "react";
import "./Search.css";
import MarkertImg from "../../Images/market-research.png";

var filteredElements = [];
export default function Search({userArray, setUserArray, setMount}) { 
  const searchRef = React.useRef();

  var oldData = userArray;
  const handleChange = () => {
    filteredElements = userArray.filter(e => e.name.toLowerCase().includes(searchRef.current.value.toLowerCase()));
    if(searchRef.current.value.length === 0 ) {
      setMount(true)
    } else {
      setUserArray(filteredElements);
    }
  };
  return (
    <div className='search'>
      <form >
        <input
          type='text'
          placeholder='Search..'
          name='search2'
          onChange={handleChange}
          ref={searchRef}
        />
        <img src={MarkertImg} alt='img' />
      </form>
    </div>
  );
}
