(() => {
  /* Достали DOM-элементы */
  const leftStagesButton = document.querySelector(".stages-button_left");
  const rightStagesButton = document.querySelector(".stages-button_right");
  const stagesContainer = document.querySelector(".stages__list");
  const stagesStepsList = document.querySelectorAll(".stages-buttons__step");

  /* Создали локальные переменные */
  let scrollStagesIndex = 0;

  /* Функция изменения активного step */
  const changeActiveStage = () => {
    stagesStepsList.forEach((step) => {
      step.classList.add("stages-buttons__step_disabled");
    });

    stagesStepsList[scrollStagesIndex].classList.remove(
      "stages-buttons__step_disabled",
    );
  };

  /* Функция контроля состояния кнопок */
  const controlStagesButtons = () => {
    if (scrollStagesIndex <= 0) {
      disableButton(leftStagesButton, "stages-button_disabled");
    } else {
      activateButton(leftStagesButton, "stages-button_disabled");
    }

    if (scrollStagesIndex >= stagesContainer.children.length - 1) {
      disableButton(rightStagesButton, "stages-button_disabled");
    } else {
      activateButton(rightStagesButton, "stages-button_disabled");
    }
  };

  /* Функция прокрутки к нужному этапу */
  const scrollToStage = (index) => {
    const item = stagesContainer.children[index];

    if (item) {
      stagesContainer.scrollTo({
        left: item.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  /* Функция определения активного этапа */
  const changeActiveStages = () => {
    [...stagesContainer.children].forEach((item, index) => {
      if (
        Math.abs(
          item.getBoundingClientRect().left -
            stagesContainer.getBoundingClientRect().left,
        ) < 40
      ) {
        scrollStagesIndex = index;

        controlStagesButtons();
        changeActiveStage();
      }
    });
  };

  /* Навешиваем обработчик на левую кнопку */
  leftStagesButton.addEventListener("click", () => {
    scrollToStage(scrollStagesIndex - 1);
  });

  /* Навешиваем обработчик на правую кнопку */
  rightStagesButton.addEventListener("click", () => {
    scrollToStage(scrollStagesIndex + 1);
  });

  /* Навешиваем обработчик scroll */
  stagesContainer.addEventListener("scroll", debounce(changeActiveStages, 100));

  /* Инициализируем начальное состояние */
  controlStagesButtons();
  changeActiveStage();
})();
