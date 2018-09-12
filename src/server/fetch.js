import nodeFetch from "node-fetch";

const fetch = (url, callback, isJSON) => {
  return nodeFetch(url)
    .then(response => {
      return isJSON ? response.json() : response.text();
    })
    .then(callback);
};

export default fetch;
