const BASE_URL = "http://localhost:3000/tricks"

fetch(BASE_URL)
.then(resp => resp.json())
.then(trickArr => {
    trickArr.forEach(trickObj => renderTricks(trickObj))
});

const skateImgs = document.querySelector('div.skate-images');
//skateImgs.addEventListener('click', dispHandler);

const trickDets = document.querySelector('div#trick-details');

const trickForm = document.querySelector('form.trick-form');
//trickForm.addEventlistener('submit', createTrick)

function renderTricks(trick) {
    const trickName = document.createElement('h2')
    trickName.textContent = trick.name
    trickName.addEventListener('click', event => getTrick(event, trick))

    skateImgs.append(trickName)
}

function getTrick(event, trick) {
    const trickH2 = document.querySelector('.skate-trick');
    trickH2.textContent = trick.name; // undefined
    
    const imgDisp = document.querySelector('.skate-img');
    imgDisp.src = trick.image;
    imgDisp.alt = trick.name;

    const vidLink = document.querySelector('#vid-link');
    vidLink.textContent = `Vid: ${trick.video}`;

    const diffLevel = document.querySelector('#difficulty');
    diffLevel.textContent = `Difficulty: ${trick.difficulty}`;

    const dopeCount = document.querySelector('#dope')
    dopeCount.textContent = `Dope: ${trick.likes}`;
    dopeCount.addEventListener('click', dopeCounter)
}

function dopeCounter()