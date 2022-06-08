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


  

  // Ajout du titre, description au survol de l'élément
  async function realisationHover() {
    let realisationsDOM = document.querySelectorAll(".realisation");

    for (let i = 0; i < realisationsDOM.length; i++) {
      realisationsDOM[i].addEventListener("mouseover", () => {
        document.querySelector(
          "#realisation-name"
        ).innerText = `${realisations[i].name}`;
        document.querySelector(
          "#realisation-description"
        ).innerText = `${realisations[i].description}`;
        document.querySelector('#realisation-letter').innerText = `${realisations[i].name.charAt(0)}`;
      });
    }
  }

  realisationHover(realisations);
}

realisationsMain();
