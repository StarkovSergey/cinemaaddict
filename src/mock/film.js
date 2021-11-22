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

export const generateFilm = () => {
  return {
    id: '',
    comments: [1, 2, 4],
    title: 'Lord of the rings',
    alternativeTitle: '',
    poster: './images/posters/the-great-flamarion.jpg',
    description: generateDescription(),
    rating: 8,
    ageRating: 0,
    director: 'Peter Jackson',
    writers: ['Fran Walsh', 'Philippa Boyens'],
    releaseDate: 2001,
    genres: ['Drama', 'Mystery'],
    actors: ['Elijah Wood', 'Ian McKellen', 'Liv Tyler', 'Viggo Mortensen'],
    country: 'New Zealand',
    runtime: 185,
  };
};
