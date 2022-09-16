// import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmark: [],
};
const createRecipe = function (data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${API_KEY}`);

    state.recipe = createRecipe(data);
    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};
export const recipeSearch = async function (query) {
  try {
    const searchData = await getJSON(
      `${API_URL}?search=${query}&key=${API_KEY}`
    );
    state.search.query = query;
    state.search.results = searchData.data.recipes.map(data => {
      return {
        id: data.id,
        image: data.image_url,
        publisher: data.publisher,
        title: data.title,
        ...(data.key && { key: data.key }),
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.log(error);
  }
};
export const searchResultsPerPage = function (pageN = state.search.page) {
  state.search.page = pageN;
  const start = (pageN - 1) * state.search.resultsPerPage;
  const end = pageN * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
export const recipeServings = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (newServing * ing.quantity) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};
const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};
export const recipeBookmark = function (recipe) {
  state.bookmark.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmark();
};
export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmark();
};
const retrieveBookmark = function () {
  const bookmarkData = localStorage.getItem('bookmarks');
  if (bookmarkData) state.bookmark = JSON.parse(bookmarkData);
};
retrieveBookmark();

const clearLocalStorage = function () {
  localStorage.clear();
};
// clearLocalStorage();
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'wrong ingredient format! please use the correct format :)'
          );
        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipe(data);
  } catch (error) {
    throw error;
  }
};
