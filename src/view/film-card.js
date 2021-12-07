import AbstractView from './abstract';

import { humanizeRuntime, makeYearDate } from '../util/cards';

const createFilmCardTemplate = (film) => {
  const {description, title, rating, releaseDate, comments, runtime, genres, poster, userDetails: {watchlist, history, favorites}} = film;

  const addActiveClassName = (parameter) => {
    return parameter ? 'film-card__controls-item--active' : '';
  }

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${makeYearDate(releaseDate)}</span>
      <span class="film-card__duration">${humanizeRuntime(runtime)}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${String(comments.length)} ${comments.length === 1 ? 'comment' : 'comments' }</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addActiveClassName(watchlist)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${addActiveClassName(history)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${addActiveClassName(favorites)}" type="button">Mark as favorite</button>
    </div>
  </article>
  `;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.openPopupClick();
  }

  setOpenPopupClickHandler = (callback) => {
    this._callback.openPopupClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openPopupClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openPopupClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openPopupClickHandler);
  }
}
