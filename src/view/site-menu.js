import { createElement } from '../utils';

const createFilterItemTemplate = (filter) => {
  const filterNameMap = {
    watchlist: 'Watchlist',
    history: 'History',
    favorites: 'Favorites'
  };

  return `<a href="#${filter.name}" class="main-navigation__item">${filterNameMap[filter.name]} <span class="main-navigation__item-count">${filter.count}</span></a>`
}

const createSiteMenuTemplate = (filters) => {
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter)).join('');

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `;
};

export default class SiteMenu {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
