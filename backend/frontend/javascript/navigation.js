const navBtn = document.querySelector(".nav-btn");
const navMobile = document.querySelector(".navigation-mobile");
let navHidden = true;
navBtn.addEventListener("click", handleNavBtn);

function handleNavBtn() {
  if (navHidden) {
    navMobile.style.transform = "translateY(0%)";
    navHidden = false;
    navBtn.style.opacity = "0";
    setTimeout(
      `navBtn.innerHTML = '<img src="./public/images/icons/close.svg" alt="close" />'`,
      300
    );
    setTimeout(`navBtn.style.opacity ="1"`, 300);
  } else {
    navMobile.style.transform = "translateY(-100%)";
    navHidden = true;
    navBtn.style.opacity = "0";
    setTimeout(
      `navBtn.innerHTML = '<img src="./public/images/icons/menu.svg" alt="menu" />'`,
      300
    );
    setTimeout(`navBtn.style.opacity ="1"`, 300);
  }
}

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((navLink) => navLink.addEventListener("click", handleNavBtn));
