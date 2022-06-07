let nextValue = 0;
let progressBarValue = 0;
// ------- DOM
const progressBar = document.querySelector('.contact-progress-bar');
// -------
let contactInputs = [
  document.querySelector("#contact-name"),
  document.querySelector("#contact-email"),
];

let regex = [/^[a-z '-]+$/i,  /.+\@.+\..+/];


function showProgress() {
    if(nextValue == 0) {
        progressBar.style.transform = `scaleX(0)`;

    }
    else if(nextValue == -200) {
        progressBar.style.transform = `scaleX(0.33)`;
    }
    else if(nextValue == -400) {
        progressBar.style.transform = `scaleX(0.66)`;
    }
    else if(nextValue == -600) {
        progressBar.style.transform = 'scaleX(1)';
    }
    
}



function next() {
  nextValue = nextValue - 200;
  showProgress();
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

 

}

function previous() {
  nextValue = nextValue + 200;
  showProgress();

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

  


}

document.querySelector("#contact-next").addEventListener("click", (e) => {
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

document.querySelector("#contact-previous").addEventListener("click", (e) => {
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

function verifyInputs() {
  for (let i = 0; i < contactInputs.length; i++) {
    contactInputs[i].addEventListener("keypress", (e) => {
      contactInputs[i].classList.remove("error-input");
      if (e.key === "Enter") {
        // Contrôle des caractères saisis
        if (regex[i].test(contactInputs[i].value)) {
          next();
        } else {
          // Contrôle des caractères saisis échoué
          contactInputs[i].classList.add("error-input");
        }
      }
    });
  }
}

document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
});



// Envoie du formulaire contact

document.querySelector("#contact-form").addEventListener("submit", () => {
  
  for (let i = 0; i < contactInputs.length; i++) {
    if (regex[i].test(contactInputs[i].value)) {
      // On envoie
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
        

       
        showProgress();
      }
      else if (!regex[1].test(contactInputs[1].value)) {

        nextValue = -100;
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
        
        
        showProgress();
      }
    }
  }
});


