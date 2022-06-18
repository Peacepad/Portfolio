async function realisationsMain() {
  const realisationsList = document.querySelector(".realisations-list");

  async function getRealisations() {
    return fetch("http://localhost:8000/api/projet")
      .then((res) => {
        return res.json();
      })
      .then((realisations) => {
        return realisations;
      })
      .catch(() => {
        console.log("erreur");
      });
  }

  let realisations = await getRealisations();

  function makeRealisationStyle() {
    for (let l = 0; l < realisations.length; l++) {
      // Création d'une div par realisation
      let realisationDiv = document.createElement("div");
      realisationDiv.setAttribute("class", "realisation");
      realisationDiv.setAttribute("id", `realisation__${l + 1}`);
      realisationsList.appendChild(realisationDiv);

      //Création de l'image
      realisationDiv.style.backgroundImage = `url(${realisations[l].image})`;
    }
  }
  makeRealisationStyle();

  // DOM
  const realisationsDOM = document.querySelectorAll(".realisation");
  const realisationName = document.querySelector("#realisation-name");
  const realisationDescription = document.querySelector(
    "#realisation-description"
  );
  const realisationLetter = document.querySelector(
    "#realisation-letter"
  );
  // Ajout du titre, description au survol de l'élément
  async function realisationHover() {
    for (let i = 0; i < realisationsDOM.length; i++) {
      realisationsDOM[i].addEventListener("mouseover", () => {
        realisationName.innerText = `${realisations[i].name}`;
        setTimeout(() => {
          realisationName.classList.add("show");
        }, 200);

        realisationDescription.innerText = `${realisations[i].description}`;
        setTimeout(() => {
          realisationDescription.classList.add("show");
        }, 200);

        realisationLetter.innerText = `${realisations[i].name.charAt(0)}`;
        setTimeout(() => {
          realisationLetter.classList.add("show-letter");
        }, 200);
      });

      realisationsDOM[i].addEventListener("mouseout", () => {
        realisationName.classList.remove("show");
        realisationDescription.classList.remove("show");
        realisationLetter.classList.remove("show-letter");
      });
    }
  }

  realisationHover(realisations);
}

realisationsMain();
