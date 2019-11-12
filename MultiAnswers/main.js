((win) => {
  const filteringQuestions = [
    {question: 'How old are you', answers: [12, 34, 78]},
    {question: 'Do you eat cheese', answers: ['yes', 'no']},
    {question: 'What is your favorite color', answers:['blue','red','green']},
    {question: 'Do you want to buy our product', answers: ['yes', 'no']},
    {question: 'Do you want more Questions?', answers: ['no']},
  ];

  let currentQuestion = 0;
  let selectionBox = document.getElementById('selectionBox');
  let childrenBoxes = [];
  let selections = [];

  const buildBoxes = () => {
    filteringQuestions.forEach((item, index) => {
      let childBox = document.createElement('div');
          childBox.className = 'selectiorBoxChild closed';
      let header = document.createElement('h2');

      header.innerHTML = item.question;

      childBox.appendChild(header);

      item.answers.forEach((item) => {
        let selection = document.createElement('span');
            selection.dataset.value = item;
            selection.innerHTML = item;

        childBox.appendChild(selection);
      })

      childrenBoxes.push(childBox);
      selectionBox.appendChild(childBox);
    });

  }

  const boxCycling = (val) => {
    childrenBoxes.forEach((el) => {
      el.classList.add("closed");
      el.classList.remove("open");
    });

    if (currentQuestion < filteringQuestions.length) {
      childrenBoxes[val].classList.remove("closed");
      childrenBoxes[val].classList.add("open");
    }

    if (currentQuestion === filteringQuestions.length) {
      console.log(selections);
      resetValues();
    }
  }

  const resetValues = () => {
    currentQuestion = 0;
    selectionBox.classList.add('closed');
    selectionBox.classList.remove('open');
    selections = [];
  }

  const setupEvents = () => {
    // For inital opening
    btnFiltering.addEventListener('click', (e) => {
      e.preventDefault();

      selectionBox.classList.add('open');
      selectionBox.classList.remove('closed');
      boxCycling(0);
    });

    selectionBox.addEventListener("click", (e) => {
      if(e.target && e.target.nodeName == "SPAN") {

        if (currentQuestion < filteringQuestions.length) {
          selections.push(e.target.dataset.value);
          currentQuestion++;

          boxCycling(currentQuestion);
        }
      }
    });
  }

  const init = () => {
    buildBoxes();
    setupEvents();
  }

  init();
})(window);
