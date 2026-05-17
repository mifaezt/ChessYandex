(() => {
  /* Достали DOM-элементы */
  const leftCarouselButton = document.querySelector(".carousel-button_left");
  const rightCarouselButton = document.querySelector(".carousel-button_right");
  const carouselContainer = document.querySelector(".participants__list");
  const carouselTextContainer = document.querySelector(
    ".carousel-buttons__text",
  );

  /* Создали локальные переменные */
  let scrollCarouselCounter = 1;

  /* Функция изменения текста */
  const changeCarouselText = (counter) => {
    carouselTextContainer.textContent = counter.toString();
  };

  /* Функция прокрутки к нужному слайду */
  const scrollToSlide = (index) => {
    const item = carouselContainer.children[index];

    if (item) {
      carouselContainer.scrollTo({
        left: item.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  /* Функция определения активного слайда */
  const changeActiveCarouselItem = () => {
    [...carouselContainer.children].forEach((item, index) => {
      if (
        Math.abs(
          item.getBoundingClientRect().left -
            carouselContainer.getBoundingClientRect().left,
        ) < 40
      ) {
        scrollCarouselCounter = index + 1;
        changeCarouselText(scrollCarouselCounter);
      }
    });
  };

  /* Навешиваем обработчик на левую кнопку */
  leftCarouselButton.addEventListener("click", () => {
    if (scrollCarouselCounter <= 1) {
      scrollToSlide(carouselContainer.children.length - 1);
    } else {
      scrollToSlide(scrollCarouselCounter - 2);
    }
  });

  /* Навешиваем обработчик на правую кнопку */
  rightCarouselButton.addEventListener("click", () => {
    if (scrollCarouselCounter >= carouselContainer.children.length) {
      scrollToSlide(0);
    } else {
      scrollToSlide(scrollCarouselCounter);
    }
  });

  /* Добавили автоматическое переключение каждые 4 секунды */
  setInterval(() => {
    if (scrollCarouselCounter >= carouselContainer.children.length) {
      scrollToSlide(0);
    } else {
      scrollToSlide(scrollCarouselCounter);
    }
  }, 4000);

  /* Навешиваем обработчик scroll */
  carouselContainer.addEventListener(
    "scroll",
    debounce(changeActiveCarouselItem, 100),
  );
})();
