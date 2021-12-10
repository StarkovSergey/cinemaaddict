import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';

import { render, RenderPosition, remove, replace } from '../util/render';

export default class Card {
  constructor(filmListContainer, movieBoardContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._movieBoardContainer = movieBoardContainer;
    this._changeData = changeData;

    this._cardComponent = null;
    this._filmDetailsComponent = null;

    // биндим функции-обработчики
    this._handleShowFilmDetails = this._handleShowFilmDetails.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._hideFilmDetails = this._hideFilmDetails.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
  }

  init(card, comments) {
    this._card = card;
    this._comments = comments;

    // локальные переменные, куда записываем созданные объекты (если инициализация впервые, то там будет null)
    const prevCardComponent = this._cardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._cardComponent = new FilmCardView(card);
    this._filmDetailsComponent = new FilmDetailsView(card, comments);

    // передаём функции-обработчики во вьюхи
    this._cardComponent.setOpenPopupClickHandler(this._handleShowFilmDetails);

    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardComponent.setFavoritesClickHandler(this._handleFavoritesClick);
    this._filmDetailsComponent.setCloseClickHandler(this._hideFilmDetails);
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmDetailsComponent.setFavoritesClickHandler(this._handleFavoritesClick);

    // если что-то null, просто отрендери карточку
    if (prevCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainer, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    // если в контейнере есть карточка, замени её
    if (this._filmListContainer.contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    // если в main есть попан, замени его
    if (this._movieBoardContainer.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
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
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmDetailsComponent.setFavoritesClickHandler(this._handleFavoritesClick);

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

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          userDetails: {
            watchlist: !this._card.userDetails.watchlist,
            history: this._card.userDetails.history,
            favorites: this._card.userDetails.favorites,
          }
        },
      )
    )
  }

  _handleHistoryClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          userDetails: {
            watchlist: this._card.userDetails.watchlist,
            history: !this._card.userDetails.history,
            favorites: this._card.userDetails.favorites,
          }
        },
      )
    )
  }

  _handleFavoritesClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          userDetails: {
            watchlist: this._card.userDetails.watchlist,
            history: this._card.userDetails.history,
            favorites: !this._card.userDetails.favorites,
          }
        },
      )
    )
  }
}
