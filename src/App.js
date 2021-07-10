/* global chrome */

import React, { useState, useReducer, useEffect } from "react";

import { Controls, List } from "components";
import { fetchData } from "helpers";
import { initialState, reducer, SET_DATA, SET_FOUND } from "store";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sort, setSort] = useState({ value: "alpha", label: "Alphabetical" });
  const [answersVisible, setAnswersVisible] = useState(false);

  useEffect(() => {
    fetchData().then((data) => dispatch({ type: SET_DATA, payload: data }));
  }, []);

  useEffect(() => {
    if (!chrome.tabs) return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "INITIALIZE" }, (response) =>
        dispatch({ type: SET_FOUND, payload: response })
      );
    });
  }, []);

  return (
    <div className="App">
      <Controls
        answersVisible={answersVisible}
        sort={sort}
        onSort={setSort}
        onReveal={setAnswersVisible}
      />
      <List sortBy={sort.value} answersVisible={answersVisible} {...state} />
    </div>
  );
}

export default App;
