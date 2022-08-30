let params = new URL(document.location).searchParams;
let projetid = parseInt(params.get("id"));

const projetContainer = document.querySelector(".projet-container");
const projetHeader = document.querySelector(".projet-header");
const projetHeaderTitle = projetHeader.querySelector("h1");
// recherche des données sur le projet

async function fetchProjet() {
  return fetch(`https://pa-delamare.fr/api/projet/${projetid}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (projet) {
      return projet;
      // Projet contient les informations du projet demandé
    })
    .catch(function (err) {
      console.log("erreur au niveau de la requête");
    });
}

async function showFetchProjet() {
  const projet = await fetchProjet();

  // Projet titre

  projetHeaderTitle.innerText = `${projet[0].name}`;

  // Projet Context
  let projetContextContainer = document.createElement("div");
  projetContextContainer.setAttribute("class", "projet-context__container");
  projetContainer.appendChild(projetContextContainer);

  let projetContextHeader = document.createElement("h2");
  projetContextHeader.innerText = "Contexte";
  projetContextContainer.appendChild(projetContextHeader);

  let projetContext = document.createElement("p");
  projetContext.innerText = `${projet[0].context}`;
  projetContextContainer.appendChild(projetContext);

  // Affichage de l'image
  let projetImageContainer = document.createElement("div");
  projetImageContainer.setAttribute("class", "projet-image__container");

  projetContainer.appendChild(projetImageContainer);

  let projetImage = document.createElement("img");
  projetImage.setAttribute("src", `${projet[0].image}`);
  projetImage.setAttribute("alt", "Aperçu du projet");
  projetImageContainer.appendChild(projetImage);

  let projetImageBackground = document.createElement("div");
  projetImageBackground.setAttribute("class", "projet-image__background");
  projetImageContainer.appendChild(projetImageBackground);

  // Projet Description
  let projetDescriptionContainer = document.createElement("div");
  projetDescriptionContainer.setAttribute(
    "class",
    "projet-description__container"
  );
  projetContainer.appendChild(projetDescriptionContainer);

  let projetDescriptionHeader = document.createElement("h2");
  projetDescriptionHeader.innerText = "Description";
  projetDescriptionContainer.appendChild(projetDescriptionHeader);

  let projetDescription = document.createElement("p");
  projetDescription.innerText = `${projet[0].description2}`;
  projetDescriptionContainer.appendChild(projetDescription);

  // Projet Link
  let projetLinkContainer = document.createElement("div");
  projetLinkContainer.setAttribute("class", "projet-link__container");
  projetContainer.appendChild(projetLinkContainer);

  let projetLinkHeader = document.createElement("h2");
  projetLinkHeader.innerText = "Lien";
  projetLinkContainer.appendChild(projetLinkHeader);

  let projetLink = document.createElement("a");
  projetLink.setAttribute("href", `${projet[0].link}`);
  projetLinkContainer.appendChild(projetLink);
  projetLink.innerHTML = `<img src="/images/github.png" alt="Github" />`;
}

showFetchProjet();

// Page infos

async function pageInfos() {
  const projet = await fetchProjet();
  document.title = `Pierre-Antoine - ${projet[0].name}`;
}

pageInfos();

// Changer de projet

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

async function nextProjet() {
  const projet = await getRealisations();

  let projetNumberMax = projet.length;
  let nextProjetDiv = document.createElement("div");
  nextProjetDiv.setAttribute("class", "projet-next");

  let nextProjetNumber;

  if (projetid == projetNumberMax) {
    nextProjetNumber = 1;
  } else {
    nextProjetNumber = projetid + 1;
  }
  nextProjetDiv.innerHTML = `<a href="./projet.html?id=${nextProjetNumber}" alt="Projet suivant"><img src="../public/images/icons/arrow_forward.svg" alt="aller en avant" /></a>`;
  projetContainer.appendChild(nextProjetDiv);
}
nextProjet();

async function previousProjet() {
  const projet = await getRealisations();

  let projetNumberMax = projet.length;
  let projetNumberMin = 1;
  let previousProjetDiv = document.createElement("div");
  previousProjetDiv.setAttribute("class", "projet-previous");

  let previousProjetNumber;

  if (projetid == projetNumberMin) {
    previousProjetNumber = projetNumberMax;
  } else {
    previousProjetNumber = projetid - 1;
  }

  previousProjetDiv.innerHTML = `<a href="./projet.html?id=${previousProjetNumber}" alt="Projet précédent"><img src="../public/images/icons/arrow_back.svg" alt="aller en arrière" /></a>`;

  projetContainer.appendChild(previousProjetDiv);
}

previousProjet();

//
async function SEO() {
  const projet = await fetchProjet();

  
  

    if(projet[0].name == "Groupomania") {
      document
      .querySelector('meta[name="keywords"]')
      .setAttribute(
        "content",
        `${projet[0].name}, React, ReactJS, Mysql, typescript, Openclassrooms, portfolio, pierre-antoine delamare, openclassroom`
      );
    }
    else {
      document
    .querySelector('meta[name="keywords"]')
    .setAttribute(
      "content",
      `${projet[0].name}, Openclassrooms, portfolio, pierre-antoine delamare, openclassroom`
    );
    }

}



SEO();
