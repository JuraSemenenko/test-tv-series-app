export const takeDataFromAPI = options => {
  const URL = `https://api.tvmaze.com/schedule?country=US&date=${options}`;
  console.log(options, URL);
  return fetch(URL).then(response => response.json());
};
