import SiteMenuView from './view/site-menu.js';
import SortView from './view/sort.js';
import ProfileView from './view/profile.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmDetailsView from './view/film-details.js';
import FooterStatsView from './view/footer-stats.js';
import ListEmptyView from './view/list-empty.js';

import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { generateComments } from './mock/comments.js';
import { render, RenderPosition, remove } from './util/render';

const CARDS_COUNT = 14;
const CARDS_COUNT_PER_STEP = 5;
const COMMENTS_QUANTITY = 5;

const cards = new Array(CARDS_COUNT).fill().map(generateFilm);
const filters = generateFilter(cards);
const comments = generateComments(COMMENTS_QUANTITY);


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFilmList = document.querySelector('.films-list');
const siteFilmListContainer = document.querySelector('.films-list__container');
const siteFooterStatistics = document.querySelector('.footer__statistics');

// рендер элементов
render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new SiteMenuView(filters), RenderPosition.AFTERBEGIN);
render(siteFooterStatistics, new FooterStatsView(), RenderPosition.BEFOREEND);

// cb-function для показа popup
const showFilmDetails = (card, comments) => {
  if (document.querySelector('.film-details')) { // * это заплатка: я не обращаюсь к компоненту
    document.querySelector('.film-details').remove();
  }

  const filmDetailsComponent = new FilmDetailsView(card, comments);
  render(siteMainElement, filmDetailsComponent, RenderPosition.BEFOREEND);
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

const renderFilmCard = (container, card) => {
  const filmCardComponent = new FilmCardView(card);
  render(container, filmCardComponent, RenderPosition.BEFOREEND);

  filmCardComponent.setOpenPopupClickHandler(() => showFilmDetails(card, comments))
}

const renderFilmList = () => {
  cards
  .slice(0, Math.min(CARDS_COUNT, CARDS_COUNT_PER_STEP))
  .forEach((card) => renderFilmCard(siteFilmListContainer, card));

  if (cards.length > CARDS_COUNT_PER_STEP) {
    let renderedCardCount = CARDS_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButtonView();

    render(siteFilmList, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setShowMoreCardsClickHandler(() => {
      cards
        .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
        .forEach((card) => renderFilmCard(siteFilmListContainer, card));

        renderedCardCount += CARDS_COUNT_PER_STEP;

        if (renderedCardCount >= cards.length) {
          remove(showMoreButtonComponent);
        }
    })
  }

  // экран, когда список фильмов пуст
  if (cards.length === 0) {
    siteFilmList.querySelector('.films-list__title').remove();
    render(siteFilmList, new ListEmptyView(), RenderPosition.BEFOREEND)
  }
}

renderFilmList();
