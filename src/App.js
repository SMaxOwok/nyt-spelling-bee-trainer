/* global chrome */

import React, { useState, useEffect } from "react";

import { Controls, List } from "components";

import "./App.css";

function App() {
  const [gameState, setGameState] = useState({
    answers: [],
    pangrams: [],
    found: [],
  });
  const [sort, setSort] = useState({ value: "alpha", label: "Alphabetical" });
  const [answersVisible, setAnswersVisible] = useState(false);

  useEffect(() => {
    if (!chrome.tabs) return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "INITIALIZE" }, (response) =>
        setGameState({ ...response })
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
      <List
        sortBy={sort.value}
        answersVisible={answersVisible}
        {...gameState}
      />
    </div>
  );
}

export default App;
