import { getRandomInteger } from '../util/common'

const generateDescription = () => {
  const string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orciut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const strings = string.split('.');

  let description = '';
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      description += strings[getRandomInteger(0, strings.length - 1)];
    }
    if (getRandomInteger()) {
      description += strings[getRandomInteger(0, strings.length - 1)];
    }
  }

  return description;
};

const generateCommentsId = () => {
  const comments = [];
  for (let i = 1; i <= 5; i++) {
    if (getRandomInteger()) {
      comments.push(i);
    }
  }
  return comments;
}

const generateDate = () => {
  return `${2000 + getRandomInteger(-65, 22)}-${getRandomInteger(1, 12)}-${getRandomInteger(1, 30)}`;
};

const generatePoster = () => {
  const posters = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ]

  return posters[getRandomInteger(0, posters.length - 1)];
}

export const generateFilm = () => {
  return {
    id: '',
    comments: generateCommentsId(),
    title: 'Lord of the rings',
    alternativeTitle: 'Lord of the rings',
    poster: generatePoster(),
    description: generateDescription(),
    rating: (getRandomInteger(1, 10) - getRandomInteger(0, 9) / 10).toFixed(1),
    ageRating: getRandomInteger(1, 18),
    director: 'Peter Jackson',
    writers: ['Fran Walsh', 'Philippa Boyens'],
    releaseDate: generateDate(),
    genres: ['Drama', 'Mystery'],
    actors: ['Elijah Wood', 'Ian McKellen', 'Liv Tyler', 'Viggo Mortensen'],
    country: 'New Zealand',
    runtime: 120 + getRandomInteger(-60, 90),
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      history: Boolean(getRandomInteger(0, 1)),
      favorites: Boolean(getRandomInteger(0, 1)),
    }
  };
};
