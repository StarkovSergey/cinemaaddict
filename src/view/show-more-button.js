import AbstractView from './abstract';

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();

    this._showMoreCardsHandler = this._showMoreCardsHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _showMoreCardsHandler(evt) {
    evt.preventDefault();
    this._callback.showMoreCards();
  }

  setShowMoreCardsClickHandler(callback) {
    this._callback.showMoreCards = callback;
    this.getElement().addEventListener('click', this._showMoreCardsHandler);
  }
}
