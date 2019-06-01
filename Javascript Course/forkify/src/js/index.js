import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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
/**
 * Search Controller
 */
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
    try {
      // 4. Search for the recipes
      await state.search.getResults();

      // 5. Render results on the UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      console.log(err);
      clearLoader();
    }
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

/**
 * Recipe Controller
 */
const controlRecipe = async () => {
  // Get ID from the URL
  const id = window.location.hash.replace('#', '');
  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Create new Recipe Object
    state.recipe = new Recipe(id);
    try {
      //  Get Recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, false);
    } catch (err) {
      console.log('error processing recipe');
    }
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
