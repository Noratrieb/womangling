const randomItem = (not) => {
  let item;

  do {
    const idx = Math.floor(Math.random() * window.ITEMS.length);
    item = window.ITEMS[idx];
  } while (not && item === not);

  return item;
};

const infoText = document.querySelector("#info-text");

function next() {
  infoText.textContent = "";
  const item = randomItem();

  const mangle = Math.random() > 0.5;

  const question = `What is the ${mangle ? "" : "de"}mangled form of this?`;

  const children = card.querySelectorAll("#card > *");
  children[0].textContent = question;
  children[1].textContent = mangle ? item.means : item.mangle;

  const options = [
    randomItem(item),
    randomItem(item),
    randomItem(item),
    randomItem(item),
  ];
  const correctIdx = Math.floor(Math.random() * options.length);
  options[correctIdx] = item;

  children[2].replaceChildren(
    ...options.map((opt, i) => {
      const isCorrect = i === correctIdx;

      const text = document.createElement("li");
      text.classList.add("flashcard-option");
      text.textContent = mangle ? opt.mangle : opt.means;
      text.tabIndex = "0";
      text.addEventListener("click", () => {
        if (isCorrect) {
          infoText.classList.remove("flashcard-error");
          next();
        } else {
          infoText.classList.add("flashcard-error");
          infoText.textContent = "Incorrect.";
        }
      });
      return text;
    })
  );
}

next();
