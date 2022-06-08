const accueilDOM = document.querySelector("#accueil");
const presentationDOM = document.querySelector(".presentation");
const realisationDOM = document.querySelector(".realisation");
const montre = document.querySelector("#montre-illustration");
const ampoule = document.querySelector("#ampoule-illustration");
const outil = document.querySelector("#outil-illustration");
const livre = document.querySelector("#livre-illustration");
// ---------
const filterDOM = document.querySelector("#realisation-filter");

/**
 * Calcul la position de l'élement par rapport au haut de la page
 * @param {HTMLElement} element
 * @return {number}
 */

function offsetTop(element, acc = 0) {
  if (element.offsetParent) {
    return offsetTop(element.offsetParent, acc + element.offsetTop);
  }
  return acc + element.offsetTop;
}

class Parallax {
  /**
   * @params {HTMLElement} element
   */

  constructor(element) {
    this.element = element;
    this.options = this.parseAttribute();

    this.onScroll = this.onScroll.bind(this);
    this.onIntersection = this.onIntersection.bind(this);
    this.onResize = this.onResize.bind(this);

    this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
    const observer = new IntersectionObserver(this.onIntersection);
    observer.observe(element);
    this.onScroll();
  }


  parseAttribute() {
    const defaultOptions = {
      y: 0.2,
      r:0,
      x:0,
      variable: false,
  
    }
    if(this.element.dataset.parrallax.startsWith('{')) {
      return {
        ...defaultOptions, ...JSON.parse(this.element.dataset.parrallax)
      }
    }
    return {...defaultOptions, y: parseFloat(this.element.dataset.parrallax)}
  }

  onIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        document.addEventListener("scroll", this.onScroll);
        window.addEventListener('resize', this.onResize);
        this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
      } else {
        document.removeEventListener("scroll", this.onScroll);
        window.removeEventListener('resize', this.onResize);
      }
    }
  }

  onResize() {
    this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
    this.onScroll()
  }

  onScroll = () => {
    window.requestAnimationFrame(() => {
      const screenY = window.scrollY + window.innerHeight / 2;
      const diffY = this.elementY - screenY;
      const translateY = diffY * -1 * this.options.y;
      if(this.options.variable) {
        this.element.style.setProperty('--parallaxY',
        `${translateY}px`)
      }
      else {
        let transform = ` translateY(${translateY}px)`;
        if(this.options.r) {
          transform += ` rotate(${diffY * this.options.r}deg)`
        }
        if(this.options.x) {
          transform += ` translateX(${diffY * -1 * this.options.x}px)`
        }
        this.element.style.setProperty(
          "transform",
          transform
        );
      }
      
    });
  };

  /**
   *
   * @returns {Parallax[]}
   */

  static bind() {
    return Array.from(document.querySelectorAll("[data-parrallax")).map(
      (element) => {
        return new Parallax(element);
      }
    );
  }
}

Parallax.bind();


// Effet d'apparition du titre des réalisations au scroll
// + Effet de la description qui se décale au scroll et la lettre qui apparait
function projetCardAnim() {
  const ratioA = 0.2; // 20% de l'élement doit être visible

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: ratioA,
  };

  const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > ratioA) {
        
        entry.target.children[0].classList.add("projet-card-anim");
        entry.target.children[2].classList.add("projet-card-anim2");
        entry.target.children[3].classList.add("projet-card-anim3");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  document.querySelectorAll(".projet-card").forEach(function (r) {
    observer.observe(r);
  });
}






