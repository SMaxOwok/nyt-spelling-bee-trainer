const ENDPOINT =
  "https://nmmvy02i62.execute-api.us-west-2.amazonaws.com/default/nyt-bee-cors-proxy";
const KEY_DATA = "DATA";
const KEY_LAST_FETCHED_AT = "LAST_FETCHED_AT";

const today = new Date().toDateString();

const fetchRemoteData = () => {
  return fetch(ENDPOINT)
    .then((res) => res.json())
    .then((parsed) => {
      localStorage.setItem(KEY_LAST_FETCHED_AT, today);
      localStorage.setItem(KEY_DATA, JSON.stringify(parsed));

      return parsed;
    })
    .catch((error) => {
      alert("Error fetching NYT Bee data");
      console.log(error);
    });
}

const fetchLocalData = () => {
  const payload = JSON.parse(localStorage.getItem(KEY_DATA));

  return Promise.resolve(payload);
}

export default function fetchData() {
  const isCached = today === localStorage.getItem(KEY_LAST_FETCHED_AT);

  return isCached ? fetchLocalData() : fetchRemoteData();
}