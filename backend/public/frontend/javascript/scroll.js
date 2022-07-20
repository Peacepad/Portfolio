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
function presentationTitle() {
  new IntersectionObserver(
    function (a, b) {
      a.forEach(function (a) {
        a.intersectionRatio > 0.1 &&
          (document
            .querySelector("#presentation-title")
            .classList.add("unzoom"),
          b.unobserve(a.target));
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 }
  ).observe(document.querySelector(".presentation-one"));
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
Parallax.bind(), presentationTitle(), appear();
