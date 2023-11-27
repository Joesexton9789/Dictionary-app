const wordInput = document.getElementById("word");
const form = document.querySelector("form");
const main = document.getElementById("main");
const wordContainer = document.querySelector(".word-container");
const exampleContainer = document.querySelector(".example-container");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "983375029amshbffff34124439d5p1b7581jsn057616b32893",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};

async function getWord(e) {
  e.preventDefault();
  updateWord();

  const url = `https://wordsapiv1.p.rapidapi.com/words/${wordInput.value}`;

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.results[0].examples);
    const res = result.results;
    const word = result.word;
    const examples = result.results[0].examples;

    const title = document.createElement("h3");
    title.classList.add("word");
    title.innerText = word;
    wordContainer.appendChild(title);

    res.forEach((def) => {
      const definition = def.definition;
      const div = createDiv(definition, "def");
      wordContainer.appendChild(div);
    });

    if (examples === undefined) {
      exampleContainer.style.visibility = "hidden";
    } else {
      exampleContainer.style.visibility = "visible";
      isExample();
      examples.forEach((example) => {
        const exp = example;
        const div = createDiv(exp, "example");
        exampleContainer.appendChild(div);
      });
    }
  } catch (error) {
    checkIfWord();
  }

  wordInput.value = "";
  updateDisplay();
}

function createDiv(text, cls) {
  const div = document.createElement("div");
  div.classList.add(cls);
  div.innerText = text;
  return div;
}

function updateWord() {
  wordContainer.innerHTML = "";
  exampleContainer.innerHTML = "";
}

function updateDisplay() {
  if (!wordContainer.firstChild) {
    wordContainer.style.visibility = "hidden";
  } else if (wordContainer.firstChild) {
    wordContainer.style.visibility = "visible";
  }

  if (!exampleContainer.firstChild) {
    exampleContainer.style.visibility = "hidden";
  } else if (exampleContainer.firstChild) {
    exampleContainer.style.visibility = "visible";
  }
}

function isExample() {
  const title = document.createElement("h3");
  title.classList.add("example-title");
  title.innerText = "Examples";
  exampleContainer.appendChild(title);
}

function checkIfWord() {
  const error = document.createElement("h3");
  error.classList.add("error");
  error.innerText = "Word not found, please try another word.";
  wordContainer.appendChild(error);
}

form.addEventListener("submit", getWord);
window.addEventListener("DOMContentLoaded", updateDisplay);
