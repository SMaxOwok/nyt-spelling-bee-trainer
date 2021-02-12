document.addEventListener("DOMContentLoaded", function(_event) {
  const button = document.querySelector("button");

  button.onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "REVEAL_ANSWERS" }, (_response) => {})
    });
  };
});
