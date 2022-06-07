let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function () {
  if (httpRequest.readyState === 4) {
    let realisationContainer = document.querySelector(".realisation-list");
    realisationContainer.innerHTML = "";
    if (httpRequest.status === 201) {
      function showDataFromServer() {
        const response = JSON.parse(httpRequest.response);
        for (let l = 0; l < response.length; l++) {
          // Création d'une carte
          let projetCard = document.createElement("div");
          projetCard.setAttribute("class", `projet-card`);
          projetCard.setAttribute('id', `projet-card__${response[l].Id}`);
          realisationContainer.appendChild(projetCard);

          // Création de l'image
          let projectCardImageContainer = document.createElement("div");
          projectCardImageContainer.setAttribute(
            "class",
            "projet-card-image-container"
          );
          projetCard.appendChild(projectCardImageContainer);
          let projectCardImage = document.createElement("img");
          projectCardImage.setAttribute("src", `${response[l].image}`);
          projectCardImageContainer.appendChild(projectCardImage);
          // Titre
          let projetCardTitle = document.createElement("div");
          projetCardTitle.setAttribute("class", "projet-card-title");
          projetCardTitle.innerText = response[l].name;
          projetCard.appendChild(projetCardTitle);
          
          // Description
          let projetCardDescription = document.createElement("p");
          projetCardDescription.setAttribute(
            "class",
            "projet-card-description"
          );
          projetCardDescription.innerText = response[l].description;
          projetCard.appendChild(projetCardDescription);
          
            // Grosse lettre
          let bigLetter = response[l].name.charAt(0);
          let projetBigLetter = document.createElement('div');
            projetBigLetter.setAttribute("class", "projet-card-letter");
            projetBigLetter.innerText = bigLetter;
            projetCard.appendChild(projetBigLetter);
          
        }
      }

      showDataFromServer();
     
    }

  }
};

httpRequest.open("GET", "http://localhost:8000/api/projet", true);

httpRequest.send();

