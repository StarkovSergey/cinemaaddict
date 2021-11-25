import { createSiteMenuTemplate } from './view/site-menu.js';
import { createSortTemplate } from './view/sort.js';
import { createProfileTemplate } from './view/profile.js';
import { createFilmCardTemplate } from './view/film-cards.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createFilmDetailsTemplate } from './view/film-details.js';
import { createFooterStats } from './view/footer-stats.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { generateComments } from './mock/comments.js';

const CARDS_COUNT = 15;
const CARDS_COUNT_PER_STEP = 5;

const films = new Array(CARDS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const comments = generateComments();

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFilmList = document.querySelector('.films-list');
const siteFilmListContainer = document.querySelector('.films-list__container');
const siteFooterStatistics = document.querySelector('.footer__statistics');

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createSortTemplate(), 'afterbegin');
render(siteMainElement, createSiteMenuTemplate(filters), 'afterbegin');

for (let i = 0; i < CARDS_COUNT; i++) {
  render(siteFilmListContainer, createFilmCardTemplate(films[i]));
}

render(siteFilmList, createShowMoreButtonTemplate());
render(siteFooterStatistics, createFooterStats(), 'afterbegin');

// render(siteMainElement, createFilmDetailsTemplate(films[0], comments));
