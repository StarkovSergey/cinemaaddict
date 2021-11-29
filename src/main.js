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
import { render, RenderPosition } from './utils.js';

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
render(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);
render(siteFooterStatistics, new FooterStatsView().getElement(), RenderPosition.BEFOREEND);

// cb-function для показа popup
const showFilmDetails = (card, comments) => {
  if (document.querySelector('.film-details')) { // * это заплатка: я не обращаюсь к компоненту
    document.querySelector('.film-details').remove();
  }

  const filmDetailsComponent = new FilmDetailsView(card, comments);
  render(siteMainElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
  document.body.classList.add('hide-overflow');

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      hideFilmDetails(filmDetailsComponent);
    }
    document.removeEventListener('keydown', onEscKeyDown);
  }

  const hideFilmDetails = () => {
    filmDetailsComponent.getElement().remove();
    filmDetailsComponent.removeElement();
    document.body.classList.remove('hide-overflow');
  }

  filmDetailsComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => hideFilmDetails());

  document.addEventListener('keydown', onEscKeyDown);
}

const renderFilmCard = (container, card) => {
  const filmCardComponent = new FilmCardView(card);
  render(container, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

  filmCardComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => showFilmDetails(card, comments));
  filmCardComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => showFilmDetails(card, comments));
  filmCardComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => showFilmDetails(card, comments));
}

const renderFilmList = () => {
  cards
  .slice(0, Math.min(CARDS_COUNT, CARDS_COUNT_PER_STEP))
  .forEach((card) => renderFilmCard(siteFilmListContainer, card));

  if (cards.length > CARDS_COUNT_PER_STEP) {
    let renderedCardCount = CARDS_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButtonView();

    render(siteFilmList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();

      cards
        .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
        .forEach((card) => renderFilmCard(siteFilmListContainer, card));

        renderedCardCount += CARDS_COUNT_PER_STEP;

        if (renderedCardCount >= cards.length) {
          showMoreButtonComponent.getElement().remove();
          showMoreButtonComponent.removeElement();
        }
    });
  }

  // экран, когда список фильмов пуст
  if (cards.length === 0) {
    siteFilmList.querySelector('.films-list__title').remove();
    render(siteFilmList, new ListEmptyView().getElement(), RenderPosition.BEFOREEND)
  }
}

renderFilmList();
