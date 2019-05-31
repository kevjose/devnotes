import Search from './models/Search';
/**
 * Global state of the app
 * - Search Object
 * - Current recipe object
 * - Shopping list object
 * - liked recipe
 *
 */
const state = {};
const controlSearch = async () => {
  // 1. get the query from the view
  const query = 'pizza'; // TODO
  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query);

    // 3. Prepare the UI for the result

    // 4. Search for the recipes
    await state.search.getResults();

    // 5. Render results on the UI
    console.log(state.search.result);
  }
};
document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
