let step = 0;

const parseIntThrow = (s) => {
  const i = parseInt(s, 10);
  if (Number.isNaN(i)) {
    throw new Error(`Cannot parse integer for ${s}`);
  }
  return i;
};

const setShowHiddenSteps = () => {
  const elements = document.querySelectorAll("[data-step]");
  for (const element of elements) {
    const sectionStep = parseIntThrow(element.dataset.step);
    if (sectionStep > step) {
      element.classList.add("hidden");
    } else {
      element.classList.remove("hidden");
    }
  }
};

const rerender = () => {
  setShowHiddenSteps();
  const buttonElements = document.querySelectorAll(
    "button[data-challenge-submit]"
  );
  for (const element of buttonElements) {
    const elemStep = parseIntThrow(element.dataset.challengeSubmit);
    element.disabled = elemStep <= step;
  }
};

const setStep = (newStep) => {
  if (newStep > step) {
    step = newStep;
    rerender();
  }
};

const initButtons = () => {
  const formElements = document.querySelectorAll("form[data-challenge]");
  for (const element of formElements) {
    const step = parseIntThrow(element.dataset.challenge);

    const error = element.querySelector(".error");
    if (!error) {
      alert(`The step ${step} is missing an error div!`);
    }

    element.addEventListener("submit", (e) => {
      e.preventDefault(e);

      error.innerText = "";

      const answer = element.dataset.answer;
      if (!answer) {
        setStep(step);
        return;
      }

      const input = e.target[0];

      const value = input.value;
      if (value === answer) {
        setStep(step);
        return;
      }

      // Wrong answer :(
      const incorrectTries = parseIntThrow(error.dataset.errors ?? "0");
      const messages = [
        "This is not the right answer, please try again.",
        "This is still not the right answer, please try again.",
        `This is still not the right answer, please try again. Tip: The answer is ${answer.length} characters long`,
        `The right answer was: '${answer}'. Enter it to finish this step.`,
      ];
      if (incorrectTries >= messages.length) {
        input.value = answer;
        setStep(step); // just give up and finish lol
        return;
      }
      error.innerText = messages[incorrectTries];
      error.dataset.errors = incorrectTries + 1;
    });
  }
};

const init = () => {
  initButtons();
  rerender();
};

init();
