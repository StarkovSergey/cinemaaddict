import { getRandomInteger } from '../utils';

const generateDescription = () => {
  const string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orciut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const strings = string.split('.');

  let description = '';
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      description += strings[getRandomInteger(0, strings.length)];
    }
    if (getRandomInteger()) {
      description += strings[getRandomInteger(0, strings.length)];
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

export const generateFilm = () => {
  return {
    id: '',
    comments: generateCommentsId(),
    title: 'Lord of the rings',
    alternativeTitle: 'Lord of the rings',
    poster: './images/posters/the-dance-of-life.jpg',
    description: generateDescription(),
    rating: (getRandomInteger(1, 10) - getRandomInteger(0, 9) / 10).toFixed(1),
    ageRating: getRandomInteger(1, 18),
    director: 'Peter Jackson',
    writers: ['Fran Walsh', 'Philippa Boyens'],
    releaseDate: '2019-05-01',
    genres: ['Drama', 'Mystery'],
    actors: ['Elijah Wood', 'Ian McKellen', 'Liv Tyler', 'Viggo Mortensen'],
    country: 'New Zealand',
    runtime: 120 + getRandomInteger(-60, 90),
  };
};
