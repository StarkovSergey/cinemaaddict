import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration'
dayjs.extend(Duration);

export const humanizeRuntime = (runtime) => {
  return dayjs.duration(runtime, 'm').format('H[h] m[m]');
};

export const makeFullDate = (date) => {
  return dayjs(date).format('DD MMMM YYYY');
};

export const makeYearDate = (date) => {
  return dayjs(date).format('YYYY');
};

export const makeTimeDate = (date) => {
  return dayjs(date).format('YYYY/M/D HH:MM');
};

export const sortCardDate = (cardA, cardB) => {
  return dayjs(cardB.releaseDate).diff(dayjs(cardA.releaseDate));
};
