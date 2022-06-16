const luigi = document.querySelector("#luigi");
const luigiw1 = document.querySelector("#luigiw1");
const luigiw2 = document.querySelector("#luigiw2");
const luigiw3 = document.querySelector("#luigiw3");
const luigiJ = document.querySelector("#luigij");
const languageDOM = document.querySelector("#presentation-language");

function luigiAnim() {
  const luigiWalkSprite = [luigi, luigiw1, luigiw2, luigiw3];
  let isJumping = false;
  let l = 0;

  const languages = [
    "HTML",
    "CSS",
    "SASS",
    "JavaScript",
    "NodeJs",
    "MySQL",
    "MongoDB",
    "React JS",
    "Python",
  ];

  function luigiWalk() {
    let times = 0;
    luigiJ.style.opacity = "0";

    luigiWalking = setInterval(() => {
      if (times > 3) {
        times = 0;
      }

      luigiWalkSprite.forEach((luigi) => {
        luigi.style.opacity = "0";
      });
      luigiWalkSprite[times].style.opacity = "1";

      times++;
    }, 133);

    setTimeout(() => {
      clearInterval(luigiWalking);
    }, 700);
  }

  function luigiJump() {
    luigiWalkSprite.forEach((luigi) => {
      luigi.style.opacity = "0";
    });

    luigiJ.style.opacity = "1";
  }

  function verifyLuigi() {
    if (isJumping == true) {
      luigiJump();
    } else {
      luigiWalk();
    }
  }

  setInterval(() => {
    verifyLuigi();
  }, 133);

  setInterval(() => {
    setTimeout(() => {
      isJumping = true;

      if (l >= languages.length) {
        l = 0;
      }
      languageDOM.innerText = languages[l];
      languageDOM.style.opacity = "1";
      l++;
    }, 700);
    setTimeout(() => {
      isJumping = false;
      languageDOM.style.opacity = "0";
    }, 1000);
  }, 2000);
}
luigiAnim();
