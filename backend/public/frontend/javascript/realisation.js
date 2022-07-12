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
        realisationDiv.setAttribute("id", `realisation__${l + 1}`);
        realisationsList.appendChild(realisationDiv);
  
        //Création de l'image
        realisationDiv.style.backgroundImage = `url(${realisations[l].image})`;
        //
        
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

          // ajout des effets de style
          setTimeout(() => {
            document.querySelector(
                "#realisation-name"
              ).classList.add("show");
              document.querySelector(
                "#realisation-description"
              ).classList.add("show");
              document.querySelector(
                "#realisation-letter"
              ).classList.add("show-letter");
            });
          },100)
          

        realisationsDOM[i].addEventListener("mouseout", () => {
            // ajout des effets de style
          document.querySelector(
            "#realisation-name"
          ).classList.remove("show");
          document.querySelector(
            "#realisation-description"
          ).classList.remove("show");
          document.querySelector(
            "#realisation-letter"
          ).classList.remove("show-letter");
        });
        
        
      }
    }
  
    realisationHover(realisations);
};
  
  realisationsMain();