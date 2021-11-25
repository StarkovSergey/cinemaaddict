import dayjs from 'dayjs';
import { getRandomInteger } from '../utils'

const generateCommentText = () => {
  const textComments = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ]

  return textComments[getRandomInteger(0, textComments.length - 1)];
}

const generateEmotion = () => {
  const emotions = [
    'angry',
    'puke',
    'sleeping',
    'smile',
  ]

  return emotions[getRandomInteger(0, emotions.length - 1)];
}

const generateDate = () => {
  return dayjs().subtract(getRandomInteger(0, 2), 'year').subtract(getRandomInteger(0, 1), 'month').subtract(getRandomInteger(0, 3), 'day').subtract(getRandomInteger(0, 24), 'hour').subtract(getRandomInteger(0, 60), 'minute');
}

export const generateComments = (quantity) => {
  let id = 0;
  const comments = new Array(quantity).fill().map(() => {
    id++;
    return {
      id,
      text: generateCommentText(),
      emotion: generateEmotion(),
      author: 'John Doe',
      date: generateDate(),
    }
  })

  return comments;
}
