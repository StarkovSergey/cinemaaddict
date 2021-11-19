import { createSiteMenuTemplate } from './view/site-menu.js';
import { createSortTemplate } from './view/sort.js';
import { createProfileTemplate } from './view/profile.js';
import { createFilmCardTemplate } from './view/film-cards.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createFilmDetailsTemplate } from './view/film-details.js';

const CARDS_COUNT = 5;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFilmList = document.querySelector('.films-list');
const siteFilmListContainer = document.querySelector('.films-list__container');

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createSortTemplate(), 'afterbegin');
render(siteMainElement, createSiteMenuTemplate(), 'afterbegin');

for (let i = 0; i < CARDS_COUNT; i++) {
  render(siteFilmListContainer, createFilmCardTemplate());
}

render(siteFilmList, createShowMoreButtonTemplate());
