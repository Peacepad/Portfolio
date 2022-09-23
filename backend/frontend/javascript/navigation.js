const navBtn = document.querySelector(".nav-btn");
const navMobile = document.querySelector(".navigation-mobile");
const contentContainer = document.querySelector('.content-container');

let navHidden = true;
navBtn.addEventListener("click", handleNavBtn);

function handleNavBtn() {
  if (navHidden) {
    navMobile.style.transform = "translate(-50%,-50%)";
    navHidden = false;
    navBtn.style.opacity = "0";
    contentContainer.style.transform="translateX(100%)"

    setTimeout(() => {
      navBtn.innerHTML = '<img src="./public/images/icons/close.svg" alt="close" />'},
      300
    );
    setTimeout(() => {
      navBtn.style.opacity ="1";
     
    }, 300);
  } else {
    navMobile.style.transform = "translate(-200%,-50%)";
    navHidden = true;
    navBtn.style.opacity = "0";
    contentContainer.style.transform="translateX(00%)"
    setTimeout(() => {
      navBtn.innerHTML = '<img src="./public/images/icons/menu.svg" alt="menu" />'},
      300
    );
    setTimeout(
      () => {
        navBtn.style.opacity ="1";
       
      }, 300);
  }
}

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((navLink) => navLink.addEventListener("click", handleNavBtn));
