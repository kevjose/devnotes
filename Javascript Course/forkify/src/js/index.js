import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
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
  const query = searchView.getInput();
  console.log(query);
  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query);

    // 3. Prepare the UI for the result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4. Search for the recipes
    await state.search.getResults();

    // 5. Render results on the UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});
