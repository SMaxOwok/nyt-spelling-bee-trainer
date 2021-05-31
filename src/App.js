import React, { useReducer, useEffect } from "react";

import { List } from "components";
import { fetchData } from "helpers";
import { initialState, reducer, SET_DATA } from "store";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData().then(data => dispatch({ type: SET_DATA, payload: data }))
  }, []);

  return (
    <div className="App">
      <List {...state} />
    </div>
  );
}

export default App;
