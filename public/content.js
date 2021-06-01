function getFoundWords() {
  return [...new Set([...document.querySelectorAll('.sb-anagram')].map(node => node.innerText.toLowerCase()))];
}

chrome.runtime.onMessage.addListener(
  function(request, _sender, response) {
    switch(request.type) {
      case "INITIALIZE": {
        return response(getFoundWords());
      }
      default: {
        return null;
      }
    }
  }
);