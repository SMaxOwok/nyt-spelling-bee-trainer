import React, { useState, useReducer, useEffect } from "react";

import { Controls, List } from "components";
import { fetchData } from "helpers";
import { initialState, reducer, SET_DATA } from "store";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sort, setSort] = useState({ value: "alpha", label: "Alphabetical" });
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    fetchData().then(data => dispatch({ type: SET_DATA, payload: data }))
  }, []);

  return (
    <div className="App">
      <Controls sort={sort} isRevealed={isRevealed} onSort={setSort} onReveal={setIsRevealed} />
      <List sortBy={sort.value} {...state} />
    </div>
  );
}

export default App;
