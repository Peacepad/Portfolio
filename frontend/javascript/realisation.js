async function realisationsMain() {
  const realisationsList = document.querySelector(".realisations-list");


  let realisations = [
    {
      "name": "Groupomania",
      "description": "Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.",
      "image": "./frontend/public/images/groupomania.png",
      "link": "https://github.com/Peacepad/groupomania"
    },
    {
      "name": "OhMYFood",
      "description": "L'objectif d'intégrer puis de dynamiser une page web avec des animations CSS en utilisant le préprocesseur Sass.",
      "image": " ./frontend/public/images/ohmyfood.png",
      "link": "https://github.com/Peacepad/ohmyfood"
    },
    {
      "name":"La chouette Agence",
      "description":"Optimiser le référencement SEO d'un site web existant, tout en améliorant l'accessibilité du site, les performances.",
      "image": " ./frontend/public/images/lachouetteagence.png",
      "link": "https://github.com/Peacepad/lachouetteagence"
    },
    {
      "name":"Piquante",
      "description":"Le front-end de l'application a été développé à l'aide d'Angular mais Piiquante a besoin d'un développeur pour construire l'API.",
      "image": "./frontend/public/images/piquante.png",
      "link": "https://github.com/Peacepad/piquante"
    },
    {
      "name":"Orinoco",
      "description":"Création du front-end d'un site e-commerce en Javascript en utilisant un API fourni.",
      "image": "./frontend/public/images/orinoco.png",
      "link": "https://github.com/Peacepad/orinoco"
    }

  ];

  // async function getRealisations() {

    
  //   return fetch("http://localhost:8000/api/projet")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((realisations) => {
  //       return realisations;
  //     })
  //     .catch(() => {
  //       console.log("erreur");
  //     });
  // }

  // let realisations = await getRealisations();

  function makeRealisationStyle() {
    for (let l = 0; l < realisations.length; l++) {
      // Création d'une div par realisation
      let realisationDiv = document.createElement("div");
      realisationDiv.setAttribute("class", "realisation appear-scroll");
      
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
