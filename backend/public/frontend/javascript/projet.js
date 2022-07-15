let params = new URL(document.location).searchParams;
let projetid = params.get("id");
const projetContainer = document.querySelector("#projet");

// recherche des données sur le projet

async function fetchProjet() {
  return fetch(`http://localhost:8080/api/projet/${projetid}`)
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
  let projetHeaderContainer = document.createElement("div");
  projetContainer.appendChild(projetHeaderContainer);
  projetHeaderContainer.setAttribute("class", "projet-header__container");

  let projetHeader = document.createElement("h1");
  projetHeader.setAttribute("class", "projet-header");
  projetHeader.innerText = `${projet[0].name}`;
  projetHeaderContainer.appendChild(projetHeader);
  
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
  projetImageContainer.appendChild(projetImage);



  

  

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

  let projetLink =document.createElement('a');
  projetLink.setAttribute('href', `${projet[0].link}`);
  projetLinkContainer.appendChild(projetLink);
  projetLink.innerHTML = `<img src="/images/github.png" alt="Github" />`;
}

showFetchProjet();
