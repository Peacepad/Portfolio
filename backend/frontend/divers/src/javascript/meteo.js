const loader = document.querySelector(".loader");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      const lon = location.coords.longitude;
      const lat = location.coords.latitude;
      callMeteoApi(lon, lat);
      findCity(lon, lat);
    },
    () => {
      loader.textContent =
        "Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer.";
    }
  );
}

const errorMsg = document.querySelector(".error-msg");
const meteoBottom = document.querySelector(".meteo-bottom");

async function callMeteoApi(lon, lat) {
  const key = "a783ff1b655a8efef32760dc98437171";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${key}`
    );

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();

    loader.style.transform = "translateY(100%)";

    meteoBottom.style.transform = "translateY(0)";

    console.log(data);
    displayTop(data);
    displayForecast(data);
  } catch (err) {
    console.log(err);
  }
}

const temperatureDiv = document.querySelector(".temperature");
const currentHour = new Date().getHours();
const logoDiv = document.querySelector(".logo");

async function displayTop(data) {
  let currentTemperature = Math.round(data.current.temp);

  temperatureDiv.textContent = `${currentTemperature}°`;

  if (currentHour >= 6 && currentHour < 21) {
    logoDiv.innerHTML = `<img src="./src/ressources/jour/${data.current.weather[0].icon}.svg" alt="météo actuelle" />`;
  } else {
    logoDiv.innerHTML = `<img src="./src/ressources/nuit/${data.current.weather[0].icon}.svg" alt="météo actuelle" />`;
  }
}

const hoursName = document.querySelectorAll(".hour-name");
const hoursTemps = document.querySelectorAll(".hour-temp");

const daysName = document.querySelectorAll(".day-name");
const daysTemp = document.querySelectorAll(".day-temp");

const weekDays = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];
const currentDay = new Date().toLocaleDateString("fr-FR", { weekday: "long" });

function displayForecast(data) {
  hoursName.forEach((hourDiv, index) => {
    const incrementedHour = currentHour + index * 3 + 1;

    if (incrementedHour > 24) {
      const calcul = incrementedHour - 24;
      hourDiv.textContent = `${calcul}h`;
    } else if (incrementedHour == 24) {
      hourDiv.textContent = "00h";
    } else {
      hourDiv.textContent = `${incrementedHour}h`;
    }

    hoursTemps[index].textContent = `${Math.trunc(
      data.hourly[index * 3 + 1].temp
    )}°`;
  });

  daysName.forEach((dayDiv, index) => {
    const incrementedDay = weekDays.indexOf(currentDay) + 1 + index;

    if (incrementedDay > 6) {
      const calcul = incrementedDay - 7;
      dayDiv.textContent = `${
        weekDays[calcul][0].toUpperCase() +
        weekDays[calcul][1] +
        weekDays[calcul][2]
      }`;
    } else {
      dayDiv.textContent = `${
        weekDays[incrementedDay][0].toUpperCase() +
        weekDays[incrementedDay][1] +
        weekDays[incrementedDay][2]
      }`;
    }
    daysTemp[index].textContent = `${Math.trunc(
      data.daily[index + 1].temp.day
    )}°`;
  });
}

// Tabs

const tabsBtns = [...document.querySelectorAll(".tabs button")];
const tabsContents = [...document.querySelectorAll(".forecast")];

tabsBtns.forEach((btn) => btn.addEventListener("click", handleTabs));

function handleTabs(e) {
  const indexToRemove = tabsBtns.findIndex((tab) =>
    tab.classList.contains("active")
  );

  tabsBtns[indexToRemove].classList.remove("active");
  tabsContents[indexToRemove].classList.remove("active");

  const indexToShow = tabsBtns.indexOf(e.target);

  tabsBtns[indexToShow].classList.add("active");
  tabsContents[indexToShow].classList.add("active");
}

const locationDiv = document.querySelector(".location");

async function findCity(lon, lat) {
  try {
    const response = fetch(
      `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}&type=street`,
      { method: "GET" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        locationDiv.textContent = `${data.features[0].properties.city}`;
      });
  } catch (error) {
    console.log(error);
  }
}
