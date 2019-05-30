import axios from 'axios';

async function getResults(query) {
  try {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const res = await axios(
      `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`
    );
    return res;
  } catch (err) {
    return err;
  }
}
getResults('pizza').then(result => console.log(result));
