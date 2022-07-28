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
function navigationOnScroll() {
  let a = 0;
  window.addEventListener("scroll", () => {
    let b = window.pageYOffset;
    b > a
      ? (document.querySelector(".navigation").style.transform =
          "translateY(-100%)")
      : (document.querySelector(".navigation").style.transform =
          "translateY(00%)"),
      (a = b <= 0 ? 0 : b);
  });
}
underlineNavigation(), window.innerWidth < 768 && navigationOnScroll();
