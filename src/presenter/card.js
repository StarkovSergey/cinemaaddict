import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';

import { render, RenderPosition, remove, replace } from '../util/render';

export default class Card {
  constructor(filmListContainer, movieBoardContainer) {
    this._filmListContainer = filmListContainer;
    this._movieBoardContainer = movieBoardContainer;

    this._cardComponent = null;
    this._filmDetailsComponent = null;

    this._handleShowFilmDetails = this._handleShowFilmDetails.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._hideFilmDetails = this._hideFilmDetails.bind(this);
  }

  init(card, comments) {
    this._card = card;

    // локальные переменные, куда записываем созданные объекты (если инициализция впервые, то там будет null)
    const prevCardComponent = this._cardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._cardComponent = new FilmCardView(card);
    this._filmDetailsComponent = new FilmDetailsView(card, comments);

    this._cardComponent.setOpenPopupClickHandler(this._handleShowFilmDetails);

    // ?
    if (prevCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainer, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    // ? Проверка на наличие в DOM необходима, чтобы не пытаться заменить то, что не было отрисовано (не очень понимаю зачем)
    if (this._filmListContainer.contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._movieBoardContainer.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    remove(prevCardComponent);
    remove(prevFilmDetailsComponent);
  }

  _handleShowFilmDetails() {
    // TODO это заплатка: я не обращаюсь к компоненту
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

  destroy() {
    remove(this._cardComponent);
    remove(this._filmDetailsComponent);
  }
}
