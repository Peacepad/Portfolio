const accueilDOM = document.querySelector("#accueil"),
  presentationDOM = document.querySelector(".presentation"),
  realisationDOM = document.querySelector(".realisation"),
  filterDOM = document.querySelector("#realisation-filter");

function offsetTop(a, b = 0) {
  return a.offsetParent
    ? offsetTop(a.offsetParent, b + a.offsetTop)
    : b + a.offsetTop;
}
class Parallax {
  constructor(a) {
    (this.element = a),
      (this.options = this.parseAttribute()),
      (this.onScroll = this.onScroll.bind(this)),
      (this.onIntersection = this.onIntersection.bind(this)),
      (this.onResize = this.onResize.bind(this)),
      (this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2),
      new IntersectionObserver(this.onIntersection).observe(a),
      this.onScroll();
  }
  parseAttribute() {
    let a = { y: 0, r: 0, x: 0, variable: !1 };
    return this.element.dataset.parrallax.startsWith("{")
      ? { ...a, ...JSON.parse(this.element.dataset.parrallax) }
      : { ...a, y: parseFloat(this.element.dataset.parrallax) };
  }
  onIntersection(a) {
    for (let b of a)
      b.isIntersecting
        ? (document.addEventListener("scroll", this.onScroll),
          window.addEventListener("resize", this.onResize),
          (this.elementY =
            offsetTop(this.element) + this.element.offsetHeight / 2))
        : (document.removeEventListener("scroll", this.onScroll),
          window.removeEventListener("resize", this.onResize));
  }
  onResize() {
    (this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2),
      this.onScroll();
  }
  onScroll = () => {
    window.requestAnimationFrame(() => {
      let d = window.scrollY + window.innerHeight / 2,
        a = this.elementY - d,
        c = -1 * a * this.options.y;
      if (this.options.variable)
        this.element.style.setProperty("--parallaxY", `${c}px`);
      else {
        let b = ` translateY(${c}px)`;
        this.options.r && (b += ` rotate(${a * this.options.r}deg)`),
          this.options.x && (b += ` translateX(${-1 * a * this.options.x}px)`),
          this.element.style.setProperty("transform", b);
      }
    });
  };
  static bind() {
    return Array.from(document.querySelectorAll("[data-parrallax")).map(
      (a) => new Parallax(a)
    );
  }
}

function appear() {
  let a = new IntersectionObserver(
    function (a, b) {
      a.forEach(function (a) {
        a.intersectionRatio > 0.25 &&
          (a.target.classList.add("appear"), b.unobserve(a.target));
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.25 }
  );
  document.querySelectorAll(".appear-scroll").forEach((b) => a.observe(b));
}
Parallax.bind(), appear();

function presentationAppear() {
  let a = new IntersectionObserver(
    function (a, b) {
      a.forEach(function (a) {
        a.intersectionRatio > 0.2 &&
          (document
            .querySelector(".presentation-container")
            .classList.add("appear-container-a"),
          b.unobserve(a.target));
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.2 }
  );
  document.querySelectorAll(".presentation").forEach((b) => a.observe(b));
}
presentationAppear();

function presentationTitleAppear() {
  let a = new IntersectionObserver(
    function (a, b) {
      a.forEach(function (a) {
        a.intersectionRatio > 0.25 &&
          (a.target.classList.add("appear-title-a"), b.unobserve(a.target));
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.25 }
  );
  document.querySelectorAll(".appear-title").forEach((b) => a.observe(b));
}
presentationTitleAppear();

function presentationTextAppear() {
  let a = new IntersectionObserver(
    function (a, b) {
      a.forEach(function (a) {
        a.intersectionRatio > 0.3 &&
          (a.target.classList.add("appear-text-a"), b.unobserve(a.target));
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.3 }
  );
  document.querySelectorAll(".appear-text").forEach((b) => a.observe(b));
}
presentationTextAppear();

function presentationPhotoAppear() {
  const ratioA = 0.25; // 25% de l'élement doit être visible

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: ratioA,
  };

  const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > ratioA) {
        entry.target.children[0].style.opacity = "1";
        entry.target.children[1].classList.add("appear-photo-a");

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  document.querySelectorAll(".appear-photo").forEach(function (r) {
    observer.observe(r);
  });
}
setTimeout(()=> {presentationPhotoAppear()},500);

function introAppear() {
  const ratioA = 0.1; // 25% de l'élement doit être visible

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: ratioA,
  };

  const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > ratioA) {
        if(window.screen.width > 992) {

          setTimeout(() => { entry.target.style.background = `#e1dbd6 url(images/realisation-intro.webp) no-repeat bottom right fixed`},500)

        } else {
          setTimeout(() => { entry.target.style.background = `#e1dbd6 url(images/realisation-intro-mini.jpg) no-repeat bottom right fixed`},500)
       
        }
      
        
        entry.target.children[0].classList.add("appear-photo-a");

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  document.querySelectorAll(".realisation-intro").forEach(function (r) {
    observer.observe(r);
  });
}
introAppear();
