import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';

import { render, RenderPosition, remove } from '../util/render';

export default class Card {
  constructor(filmListContainer, movieBoardContainer) {
    this._filmListContainer = filmListContainer;
    this._movieBoardContainer = movieBoardContainer;

    this._filmCardComponent = null;

    this._handleShowFilmDetails = this._handleShowFilmDetails.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(card, comments) {
    this._card = card;

    this._filmCardComponent = new FilmCardView(card);
    this._filmDetailsComponent = new FilmDetailsView(card, comments);

    render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    this._filmCardComponent.setOpenPopupClickHandler(this._handleShowFilmDetails);
  }

  _handleShowFilmDetails() {
    // * это заплатка: я не обращаюсь к компоненту
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }

    render(this._movieBoardContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');

    this._filmDetailsComponent.setCloseClickHandler(this._hideFilmDetails);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._hideFilmDetails(this._filmDetailsComponent);
    }
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _hideFilmDetails() {
    remove(this._filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
  }
}
