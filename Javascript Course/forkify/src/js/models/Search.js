import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const key = 'b6b9a58327dd7ba27f7da759f09325af';
      const res = await axios(
        `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${
          this.query
        }`
      );
      this.result = res.data.recipes;
    } catch (err) {
      alert(err);
    }
  }
}
