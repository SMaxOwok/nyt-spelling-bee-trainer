function getFoundWords() {
  return [
    ...new Set(
      [...document.getElementsByClassName("sb-anagram")].map((node) =>
        node.innerText.toLowerCase()
      )
    ),
  ];
}

function getGameData() {
  const { answers, pangrams } = window.gameData.today;
  const found = getFoundWords();

  return {
    answers,
    pangrams,
    found,
  };
}

// https://stackoverflow.com/questions/38881301/observe-mutations-on-a-target-node-that-doesnt-exist-yet
function waitForAddedNode({ className, onComplete }) {
  new MutationObserver(function () {
    const nodes = document.getElementsByClassName(className);

    if (nodes) {
      this.disconnect();

      onComplete(nodes[0]);
    }
  }).observe(document, {
    subtree: true,
    childList: true,
  });
}

const sendGameData = () =>
  window.postMessage({ type: "SEND_GAME_DATA", gameData: getGameData() });

const observer = new MutationObserver(sendGameData);

waitForAddedNode({
  className: "sb-wordlist-window",
  onComplete: (node) =>
    observer.observe(node, { childList: true, subtree: true }),
});

sendGameData();
