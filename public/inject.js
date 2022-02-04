function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
}

injectScript(chrome.extension.getURL("content.js"), "body");

window.addEventListener(
  "message",
  (event) => {
    switch (event.data.type) {
      case "SEND_GAME_DATA":
        return (window.gameData = event.data.gameData);
      default:
        return null;
    }
  },
  false
);

chrome.runtime.onMessage.addListener(function (request, _sender, response) {
  switch (request.type) {
    case "INITIALIZE": {
      return response(window.gameData);
    }
    default: {
      return null;
    }
  }
});
