const contactForm = document.querySelector("#contact-form");

let firstnameDOM = document.querySelector("#contact-firstname");
let lastnameDOM = document.querySelector("#contact-lastname");
let emailDOM = document.querySelector("#contact-email");
let messageDOM = document.querySelector("#contact-message");

let nameRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
let emailRegex = /^\S+@\S+\.\S+$/;

contactForm.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();

  if (!nameRegex.test(firstnameDOM.value)) {
    // firstname is invalid
    firstnameDOM.style.borderBottomColor = "red";
  }
  if (!nameRegex.test(lastnameDOM.value)) {
    // lastname is invalid
    lastnameDOM.style.borderBottomColor = "red";
  }
  if (!emailRegex.test(emailDOM.value)) {
    // mail is invalid
    emailDOM.style.borderBottomColor = "red";
  }
  if (
    nameRegex.test(firstnameDOM.value) &&
    nameRegex.test(lastnameDOM.value) &&
    emailRegex.test(emailDOM.value)
  ) {
    const contactBody = {
      firstname: firstnameDOM.value,
      lastname: lastnameDOM.value,
      email: emailDOM.value,
      message: messageDOM.value,
    };

    fetchData(contactBody);
  }
}

const errorMsg = document.querySelector(".error-msg");
const contactBtns = document.querySelectorAll(".contact-button");

async function fetchData(contactBody) {
  fetch(`https://pa-delamare.fr/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactBody),
  }).then((response) => {
    if (response.status == 201) {
      errorMsg.style.display = "flex";
      errorMsg.textContent = `Le message a été envoyé avec succès ✅`;
      contactBtns.forEach((contactBtn) => (contactBtn.style.display = "none"));
    }
  });
}

let contactInputs = [firstnameDOM, lastnameDOM, emailDOM];

// Le soulignement reprend sa couleur d'origine
contactInputs.forEach((element) => {
  element.addEventListener("input", () => {
    element.style.borderBottomColor = "#6c6b6b";
  });
});

// Le bouton annuler efface tout

document.querySelector("#contact-cancel").addEventListener("click", (e) => {
  e.preventDefault();
  firstnameDOM.value = "";
  lastnameDOM.value = "";
  emailDOM.value = "";
  messageDOM.value = "";
});
