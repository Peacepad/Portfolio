const contactForm = document.querySelector("#contact-form");

const firstnameDOM = document.querySelector("#contact-firstname");
const lastnameDOM = document.querySelector("#contact-lastname");
const emailDOM = document.querySelector("#contact-email");
const messageDOM = document.querySelector("#contact-message");

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

const contactInputs = contactForm.querySelectorAll("input");
const spanHidden = contactForm.querySelectorAll(".label-hidden");

contactInputs.forEach((element, index) => {
  element.addEventListener("input", (e) => {
    element.style.borderBottomColor = "#6c6b6b";

    if (e.target.value == "") {
      spanHidden[index].classList.remove("label-active");
    } else {
      spanHidden[index].classList.add("label-active");
    }
  });
});

messageDOM.addEventListener("input", (e) => {
  if (e.target.value == "") {
    spanHidden[3].classList.remove("label-active");
  } else {
    spanHidden[3].classList.add("label-active");
  }
});

// Le bouton annuler efface tout

document.querySelector("#contact-cancel").addEventListener("click", (e) => {
  e.preventDefault();
  firstnameDOM.value = "";
  lastnameDOM.value = "";
  emailDOM.value = "";
  messageDOM.value = "";
  spanHidden.forEach((span) => span.classList.remove("label-active"));
});
