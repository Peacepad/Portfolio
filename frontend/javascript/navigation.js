

function underlineNavigation() {
  // Accueil
  function underlineHome() {
    const ratio = 0.5; // 100% de l'élement doit être visible

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: ratio,
    };

    const handleIntersect = function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio >= ratio) {
          document.querySelector(".navigation-separator").style.transform =
            "translatex(00px)";
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector("#accueil"));
  }
  underlineHome();

  function underlinePresentation() {
    const ratio = 0.5; // 50% de l'élement doit être visible

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: ratio,
    };

    const handleIntersect = function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio >= ratio) {
          let translateX =
            document.querySelector("#navigation-about__link").offsetWidth + 20;

          document.querySelector(
            ".navigation-separator"
          ).style.transform = `translatex(${translateX}px)`;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector(".presentation"));
  }
  underlinePresentation();

  function underlineRealisation() {
    const ratio = 1;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: ratio,
    };

    const handleIntersect = function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio >= ratio) {
          let translateX =
            document.querySelector("#navigation-about__link").offsetWidth +
            document.querySelector("#navigation-realisation__link")
              .offsetWidth +
            40;
          document.querySelector(
            ".navigation-separator"
          ).style.transform = `translatex(${translateX}px)`;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector("#realisation-title"));
  }

  underlineRealisation();

  function underlineContact() {
    const ratio = 1;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: ratio,
    };

    const handleIntersect = function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio >= ratio) {
          let translateX =
            document.querySelector("#navigation-about__link").offsetWidth + document.querySelector("#navigation-realisation__link")
            .offsetWidth +
            document.querySelector("#navigation-contact__link")
              .offsetWidth +
            60;
          document.querySelector(
            ".navigation-separator"
          ).style.transform = `translatex(${translateX}px)`;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector("#contact-top"));
  }

  underlineContact();
}

underlineNavigation();
