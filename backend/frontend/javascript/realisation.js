async function realisationsMain() {
  const realisationsList = document.querySelector(".realisations-list");

  async function getRealisations() {
    return fetch(`https://pa-delamare.fr/api/projet`)
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

      realisationDiv.setAttribute("id", `realisation_${realisations[l].id}`);
      realisationsList.appendChild(realisationDiv);

      // Création de l'image
      let realisationImageDiv = document.createElement("div");
      realisationImageDiv.setAttribute(
        "class",
        "realisation-image appear-photo"
      );
      realisationDiv.appendChild(realisationImageDiv);

      let realisationImage = document.createElement("img");
      realisationImage.setAttribute("src", `${realisations[l].image}`);
      realisationImage.setAttribute(
        "alt",
        `Photo du projet: ${realisations[l].name}`
      );
      realisationImageDiv.appendChild(realisationImage);

      let realisationImageBackground = document.createElement("div");
      realisationImageBackground.setAttribute("class", "img-back");
      realisationImageDiv.appendChild(realisationImageBackground);

      // Création du titre
      let realisationTitle = document.createElement("p");
      realisationTitle.innerText = `${realisations[l].name}`;
      realisationTitle.setAttribute("class", "realisation-title");
      realisationDiv.appendChild(realisationTitle);

      // Création du lien
      // let realisationButtonLink = document.createElement("a");
      // realisationButtonLink.setAttribute(
      //   "href",
      //   `projets/projet.html?id=${realisations[l].id}`
      // );
      // realisationDiv.appendChild(realisationButtonLink);

      let realisationButton = document.createElement("div");
      realisationButton.setAttribute("class", "realisation-link");
      realisationButton.setAttribute(
        "id",
        `realisation-link__${realisations[l].id}`
      );
      realisationButton.setAttribute("role", "navigation")

      // realisationButtonLink.appendChild(realisationButton);
      realisationDiv.appendChild(realisationButton);

      let realisationButtonText = document.createElement("div");
      realisationButtonText.setAttribute("class", "button-text");
      realisationButtonText.innerText = "En voir plus";
      realisationButton.appendChild(realisationButtonText);
    }
    buttonsEffect();
  }

  makeRealisationStyle();
}

realisationsMain();

async function buttonsEffect() {
  const realButtons = document.querySelectorAll(".realisation-link");
  const articles = document.querySelectorAll("article");

  realButtons.forEach((realButton) =>
    realButton.addEventListener("click", clickButtons)
  );

  function clickButtons(e) {
    e.preventDefault()
    articles.forEach((article) => {
      article.style.transform = "translateX(-100%)";
    });

    let projetId = e.currentTarget.getAttribute('id').split('__')[1]
    
    setTimeout(() => {
      window.location.href = `/projets/projet.html?id=${projetId}`
    },500)
  }
}
