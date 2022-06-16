const lamp = document.querySelector('#presentation-lamp');
const lampSwitch = document.querySelector('#lamp-switch');
let light = true;

lampSwitch.addEventListener("click", () => {
light = !light;

if(light == true) {
    lamp.setAttribute("src", "./frontend/public/images/lamp.png");
    document.querySelector('#presentation-two__text').style.boxShadow ="0px 20px 1px 5px rgba(0,0,0,0.3)";
    document.querySelector('#presentation-two__text').style.backgroundColor ="rgb(230, 230, 230)";
}
else {
    lamp.setAttribute("src", "./frontend/public/images/lamp-off.png");
   
    document.querySelector('#presentation-two__text').style.boxShadow ="none";
    document.querySelector('#presentation-two__text').style.backgroundColor ="rgb(220, 220, 220)";
    
}
})