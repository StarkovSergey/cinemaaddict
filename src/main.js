import SiteMenuView from './view/site-menu.js';
import ProfileView from './view/profile.js';
import FooterStatsView from './view/footer-stats.js';

import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { generateComments } from './mock/comments.js';
import { render, RenderPosition } from './util/render';

import MovieBoardPresenter from './presenter/movie-board.js';

const CARDS_COUNT = 14;
const COMMENTS_QUANTITY = 5;

const cards = new Array(CARDS_COUNT).fill().map(generateFilm);
const filters = generateFilter(cards);
const comments = generateComments(COMMENTS_QUANTITY);


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFilmListSection = document.querySelector('.films-list');
const siteFilmListContainer = document.querySelector('.films-list__container');
const siteFooterStatistics = document.querySelector('.footer__statistics');


render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);

const movieBoardPresenter = new MovieBoardPresenter(siteMainElement, siteFilmListSection, siteFilmListContainer)
movieBoardPresenter.init(cards, comments);

render(siteMainElement, new SiteMenuView(filters), RenderPosition.AFTERBEGIN);
render(siteFooterStatistics, new FooterStatsView(), RenderPosition.BEFOREEND);
