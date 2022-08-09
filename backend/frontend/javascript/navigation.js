const navBtn = document.querySelector(".nav-btn");
const navMobile = document.querySelector(".navigation-mobile");
let navHidden = true;
navBtn.addEventListener("click", handleNavBtn);

function handleNavBtn() {
  if(navHidden) {
    navMobile.style.transform = "translateY(0%)";
    navHidden = false;
    navBtn.style.color = "white";
  }
  else {
    
    navMobile.style.transform = "translateY(-100%)";
    navHidden = true;
    navBtn.style.color = "black";
  }
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(navLink => navLink.addEventListener('click', handleNavBtn))