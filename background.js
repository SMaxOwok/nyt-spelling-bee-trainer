const today = new Date().toDateString();

// Fetches answers from lambda
const fetchRemoteAnswers = async () =>
  fetch("https://nmmvy02i62.execute-api.us-west-2.amazonaws.com/default/nyt-bee-cors-proxy")
    .then(res => res.json())
    .then(parsed => {
      chrome.storage.local.set({
        currentDate: today,
        ...parsed
      });

      return parsed;
    })
    .catch((error) => {
      alert("Error fetching NYT Bee data");
      console.log(error);
    });

// Fetch answers from browser storage
const fetchLocalAnswers = async () =>
  new Promise((resolve, _reject) =>
    chrome.storage.local.get(["answers", "pangrams"], (items) => resolve(items))
  );

const determineCachedStatus = async () =>
  new Promise((resolve, _reject) =>
    chrome.storage.local.get("currentDate", ({ currentDate }) =>
      resolve(today === currentDate)
    )
  );

chrome.runtime.onMessage.addListener(
  function(request, _sender, sendResponse) {
    switch (request.type) {
      case "INITIALIZE":
        (async () => {
          determineCachedStatus().then((isCached) => {
            const fetchAnswers = isCached ? fetchLocalAnswers : fetchRemoteAnswers;

            fetchAnswers()
              .then(({ answers, pangrams }) => sendResponse({ payload: { answers, pangrams } }))
              .catch((error) => {
                alert("Error initializing trainer");
                console.log(error);
              });
          });
        })()

        return true;
    }
  }
);
