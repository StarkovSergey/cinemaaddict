import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration'
dayjs.extend(Duration);

export const humanizeRuntime = (runtime) => {
  return dayjs.duration(runtime, 'm').format('H[h] m[m]');
};

export const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1))
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

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};
