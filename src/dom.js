import { headStyle } from './utils.js'

let moviesList = null
export let inputSearch = null
export let triggerMode = false

const createElement = ({
  tag = 'div',
  attrs = {},
  container = null,
  position = 'append',
  event = null,
  handler = null,
}) => {
  const el = document.createElement(tag)

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'innerHTML') {
      el.innerHTML = value
    } else {
      el.setAttribute(key, value)
    }
  })

  if (container && position === 'prepend') {
    container.prepend(el)
  }
  if (container && position === 'append') {
    container.append(el)
  }

  if (event && handler && typeof handler === 'function') {
    el.addEventListener(event, handler)
  }
  return el
}

const createStyle = () => {
  createElement({
    tag: 'style',
    attrs: { innerHTML: headStyle },
    container: document.head,
  })
}

const createMarkup = () => {
  // div.container
  const container = createElement({
    attrs: { class: "container" },
    container: document.body,
    position: "prepend",
  });

  // h1
  createElement({
    tag: "h1",
    attrs: { innerHTML: "Застосунок пошуку фільмів" },
    container,
  });

  // div.search
  const searchBox = createElement({
    attrs: { class: "search" },
    container,
  });

  // div.search__group.search__group--input
  const intputBox = createElement({
    attrs: { class: "search__group search__group--input" },
    container: searchBox,
  });

  // label.search__label-input
  createElement({
    tag: "label",
    attrs: {
      class: "search__label-input",
      for: "search",
      innerHTML: "Пошук фільмів",
    },
    container: intputBox,
  });

  // input.search__input
  inputSearch = createElement({
    tag: "input",
    attrs: {
      class: "search__input",
      id: "search",
      type: "search",
      placeholder: "Почніть вводити назву фільму...",
    },
    container: intputBox,
  });

  // div.search__group.search__group--checkbox
  const checkBox = createElement({
    attrs: { class: "search__group search__group--checkbox" },
    container: searchBox,
  });

  // input.search__checkbox
  createElement({
    tag: "input",
    attrs: {
      class: "search__checkbox",
      id: "checkbox",
      type: "checkbox",
    },
    container: checkBox,
    event: "click",
    handler: () => {
      triggerMode = !triggerMode;
    },
  });

  // label.search__label-checkbox
  createElement({
    tag: "label",
    attrs: {
      class: "search__label-checkbox",
      for: "checkbox",
      innerHTML: "Додавати фільми до вже існуючого списку",
    },
    container: checkBox,
  });

  // div.search__group.search__group--year
  const yearBox = createElement({
    attrs: { class: "search__group search__group--year" },
    container: searchBox,
  });

  // input.search__input-year
  const inputYear = createElement({
    tag: "input",
    attrs: {
      class: "search__input-year",
      id: "yearInput",
      type: "text",
      placeholder: "Введіть рік...",
    },
    container: yearBox,
  });

  // label.search__label-year
  createElement({
    tag: "label",
    attrs: {
      class: "search__label-year",
      for: "yearInput",
      innerHTML: "Пошук по рокам",
    },
    container: yearBox,
  });

  // div.movies
  moviesList = createElement({
    attrs: { class: "movies" },
    container,
  });
};

export const addMovieToList = movie => {
  // div.movie
  const item = createElement({
    tag: 'div',
    attrs: { class: 'movie' },
    container: moviesList,
    position: 'prepend',
  })
  // img.movie__image
  createElement({
    tag: 'img',
    attrs: {
      class: 'movie__image',
      src: /(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'img/no-image1.png',
      alt: `${movie.Title} ${movie.Year}`,
      title: `${movie.Title} ${movie.Year}`,
    },
    container: item,
  })
}

export const clearMoviesMarkup = () => {
  moviesList && (moviesList.innerHTML = '')
}

export const renderApp = () => {
  createMarkup()
  createStyle()

}
