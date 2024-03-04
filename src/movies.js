import {
  renderApp, addMovieToList, inputSearch, clearMoviesMarkup, triggerMode,
} from './dom.js'

let searchLast = null

const debounceTime = (() => {
  let timer = null

  return (cb, ms) => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    timer = setTimeout(cb, ms)
  }
})()

const getData = url => fetch(url)
  .then(res => res.json())
  .then(data => {
    if (!data || !data.Search) throw Error('No data')
    return data.Search
  })

const inputSearchHandler = e => {
  debounceTime(() => {
    const searchString = e.target.value.trim()
    const yearInput = document.getElementById('yearInput');
    const year = yearInput.value.trim();


    if ((searchString.length < 4 && year === '') || searchString === searchLast) return
    if (!triggerMode) clearMoviesMarkup()

    const apiUrl = `https://www.omdbapi.com/?apikey=5d4c229f&s=${searchString}&y=${year}`;

    getData(apiUrl)
      .then(data => data.forEach(movie => addMovieToList(movie)))
      .catch(err => console.log(err))

    searchLast = searchString
  }, 1000)
}

const yearInputHandler = () => {
  debounceTime(() => {
    const year = document.getElementById('yearInput').value.trim();
    const searchString = inputSearch.value.trim();

    if ((year.length < 4 && searchString === '') || year === searchLast) return;
    if (!triggerMode) clearMoviesMarkup();

    const apiUrl = `https://www.omdbapi.com/?apikey=5d4c229f&s=${searchString}&y=${year}`;

    getData(apiUrl)
      .then(data => data.forEach(movie => addMovieToList(movie)))
      .catch(err => console.log(err));

    searchLast = year;
  }, 1000);
};

export const appInit = () => {
  renderApp()
  inputSearch.addEventListener('input', inputSearchHandler)

  const yearInput = document.getElementById('yearInput');
  if (yearInput) {
    yearInput.addEventListener('input', yearInputHandler);
  }
}
