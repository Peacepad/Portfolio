const creationsItems = document.querySelectorAll('.creations-item');

creationsItems.forEach((creationsItem) => {
    creationsItem.addEventListener('click', handleCreationClick)
});

function handleCreationClick(e) {
    creationsItems.forEach((creationsItem) => {
        creationsItem.style.flex= "1"
    })
    e.target.style.flex = "2"
}