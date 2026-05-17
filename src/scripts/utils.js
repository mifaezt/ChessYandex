/* Функция отключения кнопки */
const disableButton = (button, className) => {
  button.classList.add(className);
  button.disabled = true;
};

/* Функция включения кнопки */
const activateButton = (button, className) => {
  button.classList.remove(className);
  button.disabled = false;
};

/* Функция debounce для оптимизации scroll-событий */
const debounce = (callback, delay = 100) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
