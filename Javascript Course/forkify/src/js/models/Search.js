import axios from 'axios';
import { proxy, key } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
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
