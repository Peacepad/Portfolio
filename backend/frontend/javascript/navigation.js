const navBtn = document.querySelector(".nav-btn");
const navMobile = document.querySelector(".navigation-mobile");
let navHidden = true;
navBtn.addEventListener("click", handleNavBtn);

function handleNavBtn() {
  if(navHidden) {
    navMobile.style.transform = "translateY(0%)";
    navHidden = false;
    navBtn.style.opacity ="0";
    setTimeout(`navBtn.innerHTML = '<span class="material-symbols-outlined"> close </span>'`,300);
    setTimeout(`navBtn.style.opacity ="1"`,300);

    
  }
  else {
    
    navMobile.style.transform = "translateY(-100%)";
    navHidden = true;
    navBtn.style.opacity ="0";
    setTimeout(`navBtn.innerHTML = '<span class="material-symbols-outlined"> menu </span>'`,300);
    setTimeout(`navBtn.style.opacity ="1"`,300);
  }
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(navLink => navLink.addEventListener('click', handleNavBtn))