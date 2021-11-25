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

const CARDS_COUNT = 14;
const CARDS_COUNT_PER_STEP = 5;
const COMMENTS_QUANTITY = 5;


const films = new Array(CARDS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const comments = generateComments(COMMENTS_QUANTITY);

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

for (let i = 0; i < Math.min(CARDS_COUNT, CARDS_COUNT_PER_STEP); i++) {
  render(siteFilmListContainer, createFilmCardTemplate(films[i]));
}

if (films.length > CARDS_COUNT_PER_STEP) {
  let renderedCardCount = CARDS_COUNT_PER_STEP;
  render(siteFilmList, createShowMoreButtonTemplate());

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => render(siteFilmListContainer, createFilmCardTemplate(card), 'beforeend'));

      renderedCardCount += CARDS_COUNT_PER_STEP;

      if (renderedCardCount >= films.length) {
        showMoreButton.remove();
      }
  });
}

render(siteFooterStatistics, createFooterStats(), 'afterbegin');

render(siteMainElement, createFilmDetailsTemplate(films[0], comments));
