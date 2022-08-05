function underlineNavigation() {
  !(function () {
    let a = new IntersectionObserver(
      function (a, b) {
        a.forEach(function (a) {
          a.intersectionRatio >= 0.5 &&
            (document.querySelector(".navigation-separator").style.transform =
              "translatex(00px)");
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );
    a.observe(document.querySelector("#accueil"));
  })(),
    (function () {
      let a = new IntersectionObserver(
        function (a, b) {
          a.forEach(function (a) {
            if (a.intersectionRatio >= 0.4) {
              let b =
                document.querySelector("#navigation-about__link").offsetWidth +
                20;
              document.querySelector(
                ".navigation-separator"
              ).style.transform = `translatex(${b}px)`;
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.4 }
      );
      a.observe(document.querySelector(".presentation"));
    })(),
    (function () {
      let a = new IntersectionObserver(
        function (a, b) {
          a.forEach(function (a) {
            if (a.intersectionRatio >= 0.15) {
              let b =
                document.querySelector("#navigation-about__link").offsetWidth +
                document.querySelector("#navigation-realisation__link")
                  .offsetWidth +
                40;
              document.querySelector(
                ".navigation-separator"
              ).style.transform = `translatex(${b}px)`;
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.15 }
      );
      a.observe(document.querySelector("#realisations"));
    })(),
    (function () {
      let a = new IntersectionObserver(
        function (a, b) {
          a.forEach(function (a) {
            if (a.intersectionRatio >= 0.2) {
              let b =
                document.querySelector("#navigation-about__link").offsetWidth +
                document.querySelector("#navigation-realisation__link")
                  .offsetWidth +
                document.querySelector("#navigation-contact__link")
                  .offsetWidth +
                60;
              document.querySelector(
                ".navigation-separator"
              ).style.transform = `translatex(${b}px)`;
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.2 }
      );
      a.observe(document.querySelector("#contact"));
    })();
}


// Mobile

const navBtn = document.querySelector(".nav-btn");
const navMobile = document.querySelector(".navigation-mobile");
let navHidden = true;
navBtn.addEventListener("click", handleNavBtn);

function handleNavBtn(e) {

  if(navHidden) {
    navMobile.style.display = "flex";
    navMobile.style.opacity = "1";
    navHidden = false;
    navBtn.style.color = "white";
  }
  else {
    navMobile.style.display = "none";
    navMobile.style.opacity = "0";
    navHidden = true;
    navBtn.style.color = "black";
  }
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(navLink => navLink.addEventListener('click', handleNavBtn))