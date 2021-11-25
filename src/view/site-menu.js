const createFilterItemTemplate = (filter) => {
  const filterNameMap = {
    watchlist: 'Watchlist',
    history: 'History',
    favorites: 'Favorites'
  };

  return `<a href="#${filter.name}" class="main-navigation__item">${filterNameMap[filter.name]} <span class="main-navigation__item-count">${filter.count}</span></a>`
}

export const createSiteMenuTemplate = (filters) => {
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter)).join('');

  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `;
};
