import SortView from '../view/sort.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import ListEmptyView from '../view/list-empty.js';
import CardPresenter from './card';
import { updateItem } from '../util/common.js';
import { render, RenderPosition, remove } from '../util/render';

const CARDS_COUNT_PER_STEP = 5;

export default class movieBoard {
  constructor(movieBoardContainer, filmListSection, filmListContainer) { // siteMainElement, siteFilmListSection, siteFilmListContainer
    this._movieBoardContainer = movieBoardContainer;
    this._filmListSection = filmListSection;
    this._filmListContainer = filmListContainer;

    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    this._cardMap = new Map();

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._sortComponent = new SortView();
    this._listEmptyComponent = new ListEmptyView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleCardChange = this._changeData.bind(this);
    this._changeData = this._changeData.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
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

  // принимает объект обновленной карточки и с помощью утилитарной функции обновляет данные в моках. Затем вызывается init и всё перерисовывается
  // передаётся в создаваемый CardPresenter (метод _renderFilmCard)
  _changeData(updatedCard) {
    this._cards = updateItem(this._cards, updatedCard);
    this._cardMap.get(updatedCard.id).init(updatedCard, this._comments);
  }

  _handleModeChange() {
    this._cardMap.forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._movieBoardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilmCard(container, card) {
    const filmCardPresenter = new CardPresenter(container, this._movieBoardContainer, this._changeData, this._handleModeChange);
    filmCardPresenter.init(card, this._comments);
    this._cardMap.set(card.id, filmCardPresenter);
  }

  _renderFilmCards(from, to) {
    this._cards
      .slice(from, to)
      .forEach((card) => this._renderFilmCard(this._filmListContainer, card));
  }

  _handleShowMoreButtonClick() {
    this._renderFilmCards(this._renderedCardCount, this._renderedCardCount + CARDS_COUNT_PER_STEP);
    this._renderedCardCount += CARDS_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._cards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmListSection, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setShowMoreCardsClickHandler(this._handleShowMoreButtonClick);
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

  _clearFilmList() {
    console.log(this._cardMap)
    this._cardMap.forEach((presenter) => presenter.destroy());
    this._cardMap.clear(); // очищаем словарь
    this._renderedCardCount = CARDS_COUNT_PER_STEP; // обнуляем количество показанных карточек
    remove(this._showMoreButtonComponent); // удаляем кнопку
  }
}
