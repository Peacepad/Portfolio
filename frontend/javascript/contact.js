let nextValue = 0;
let progressBarValue = 0;
// ------- DOM
const nextButton = document.querySelector("#contact-next");
const previousButton = document.querySelector("#contact-previous");
const contactForm = document.querySelector("#contact-form");
// -------
let contactInputs = [
  document.querySelector("#contact-name"),
  document.querySelector("#contact-email"),
];

let regex = [/^[a-z '-]+$/i,  /.+\@.+\..+/];


function next() {
  nextValue = nextValue - 200;
 
  document.querySelector(
    ".contact-form__one"
  ).style.transform = `translateY(${nextValue}px)`;
  document.querySelector(
    ".contact-form__two"
  ).style.transform = `translateY(${nextValue}px)`;
  document.querySelector(
    ".contact-form__three"
  ).style.transform = `translateY(${nextValue}px)`;
  document.querySelector(
    ".contact-form__four"
  ).style.transform = `translateY(${nextValue}px)`;
  document.querySelector(
    ".contact-form__five"
  ).style.transform = `translateY(${nextValue}px)`;
}

function previous() {
  nextValue = nextValue + 200;

  document.querySelector(
    ".contact-form__one"
  ).style.transform = `translateY(${nextValue}px)`;
  document.querySelector(
    ".contact-form__two"
  ).style.transform = `translateY(${nextValue}px)`;
  document.querySelector(
    ".contact-form__three"
  ).style.transform = `translateY(${nextValue}px)`;
  document.querySelector(
    ".contact-form__four"
  ).style.transform = `translateY(${nextValue}px)`;
  document.querySelector(
    ".contact-form__five"
  ).style.transform = `translateY(${nextValue}px)`;
}

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (nextValue > -600) {
    next();
    document.querySelector("#contact-previous").classList.remove("disable");
  }
  if(nextValue === -600) {
    e.currentTarget.classList.add("disable");
  } else {
    e.currentTarget.classList.remove("disable");
  }
});

previousButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (nextValue < 000) {
    previous();
    document.querySelector("#contact-next").classList.remove("disable");
  }
  if(nextValue === 0) {
    e.currentTarget.classList.add("disable");
  } else {
    e.currentTarget.classList.remove("disable");
  }
});

// Envoie du formulaire contact

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  function inputsControl() {
  for (let i = 0; i < contactInputs.length; i++) {
    if (regex[i].test(contactInputs[i].value)) {
      nextValue = -600;
      next();
      nextButton.classList.add("disable");
      previousButton.classList.add("disable");
    } else {
      if (!regex[0].test(contactInputs[0].value)) {
        // si le premier champ est faux

        nextValue = 0;
        document.querySelector(
          ".contact-form__one"
        ).style.transform = `translateY(${nextValue}px)`;
        document.querySelector(
          ".contact-form__two"
        ).style.transform = `translateY(${nextValue}px)`;
        document.querySelector(
          ".contact-form__three"
        ).style.transform = `translateY(${nextValue}px)`;
        document.querySelector(
          ".contact-form__four"
        ).style.transform = `translateY(${nextValue}px)`;
        document.querySelector(
          ".contact-form__five"
        ).style.transform = `translateY(${nextValue}px)`;
        previousButton.classList.add("disable");
        nextButton.classList.remove("disable");
      }
      else if (!regex[1].test(contactInputs[1].value)) {

        nextValue = -200;
        document.querySelector(
          ".contact-form__one"
        ).style.transform = `translateY(${nextValue}px)`;
        document.querySelector(
          ".contact-form__two"
        ).style.transform = `translateY(${nextValue}px)`;
        document.querySelector(
          ".contact-form__three"
        ).style.transform = `translateY(${nextValue}px)`;
        document.querySelector(
          ".contact-form__four"
        ).style.transform = `translateY(${nextValue}px)`;
        document.querySelector(
          ".contact-form__five"
        ).style.transform = `translateY(${nextValue}px)`;
      }
        
      }
    }
  }

  inputsControl()
});


