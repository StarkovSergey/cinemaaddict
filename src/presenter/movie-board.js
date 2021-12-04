import SortView from '../view/sort.js';
import FilmCardView from '../view/film-card.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmDetailsView from '../view/film-details.js';
import ListEmptyView from '../view/list-empty.js';
import { render, RenderPosition, remove } from '../util/render';

const CARDS_COUNT_PER_STEP = 5;

export default class movieBoard {
  constructor(movieBoardContainer, filmListSection, filmListContainer) { // siteMainElement, siteFilmListSection, siteFilmListContainer
    this._movieBoardContainer = movieBoardContainer;
    this._filmListSection = filmListSection;
    this._filmListContainer = filmListContainer;

    this._sortComponent = new SortView();
    this._listEmptyComponent = new ListEmptyView();
  }

  init(cards, comments) {
    this._cards = cards.slice();
    this._comments = comments.slice();

    if (this._cards.length === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderSort();
    this._renderFilmList();
  }

  _renderSort() {
    render(this._movieBoardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsDetails(card, comments) {
    if (document.querySelector('.film-details')) { // * это заплатка: я не обращаюсь к компоненту
      document.querySelector('.film-details').remove();
    }

    const filmDetailsComponent = new FilmDetailsView(card, comments);
    render(this._movieBoardContainer, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        hideFilmDetails(filmDetailsComponent);
      }
      document.removeEventListener('keydown', onEscKeyDown);
    }

    const hideFilmDetails = () => {
      remove(filmDetailsComponent);
      document.body.classList.remove('hide-overflow');
    }

    filmDetailsComponent.setCloseClickHandler(hideFilmDetails);
    document.addEventListener('keydown', onEscKeyDown);
  }

  _renderFilmCard(container, card) {
    const filmCardComponent = new FilmCardView(card);
    render(container, filmCardComponent, RenderPosition.BEFOREEND);
    filmCardComponent.setOpenPopupClickHandler(() => this._renderFilmsDetails(card, this._comments))
  }

  _renderFilmCards(from, to) {
    this._cards
      .slice(from, to)
      .forEach((card) => this._renderFilmCard(this._filmListContainer, card));
  }

  _renderShowMoreButton() {
    let renderedCardCount = CARDS_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButtonView();

    render(this._filmListSection, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setShowMoreCardsClickHandler(() => {
      this._cards
        .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
        .forEach((card) => this._renderFilmCard(this._filmListContainer, card));

        renderedCardCount += CARDS_COUNT_PER_STEP;

        if (renderedCardCount >= this._cards.length) {
          remove(showMoreButtonComponent);
        }
    })
  }

  _renderFilmList() {
    this._renderFilmCards(0, Math.min(this._cards.length, CARDS_COUNT_PER_STEP));

    if (this._cards.length > CARDS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderListEmpty() {
    this._filmListSection.querySelector('.films-list__title').remove();
    render(this._filmListSection, this._listEmptyComponent, RenderPosition.BEFOREEND)
  }
}
