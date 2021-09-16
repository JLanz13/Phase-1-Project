const BASE_URL = "http://localhost:3000/tricks"

fetch(BASE_URL)
.then(resp => resp.json())
.then(trickArr => {
    trickArr.forEach(trickObj => renderTricks(trickObj))
});

const trickMenu = document.querySelector('div.skate-images');

const trickDets = document.querySelector('div#trick-details');

const trickForm = document.querySelector('form.trick-form');
trickForm.addEventListener('submit', formInfo)

function renderTricks(trick) {
    const trickName = document.createElement('h2')
    trickName.textContent = trick.name
    trickName.addEventListener('click', event => getTrick(event, trick))

    trickMenu.append(trickName)
}

function getTrick(event, trick) {
    const trickH2 = document.querySelector('.skate-trick');
    trickH2.textContent = trick.name;
    
    const imgDisp = document.querySelector('.skate-img');
    imgDisp.src = trick.image;
    imgDisp.alt = trick.name;

    const trickInst = document.querySelector('#instruction')
    trickInst.textContent = `Instruction: ${trick.instruction}`


    const vidLinkDiv = document.querySelector('#vid-link');
    vidLinkDiv.innerHTML = `
     <iframe 
       width="761" 
       height="428" 
       src="https://www.youtube.com/embed/${trick.video}" 
       title="YouTube video player" 
       frameborder="0" 
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
       allowfullscreen>
     </iframe>
    `

    const diffLevel = document.querySelector('#difficulty');
    diffLevel.textContent = `Difficulty: ${trick.difficulty}`;

    const dopeCount = document.querySelector('#dope');
    dopeCount.textContent = `Dope: ${trick.likes}`;
    
    const dopeBttn = document.querySelector('#dope-counter')
    dopeBttn.addEventListener('click', () => dopeCounter(trick, dopeCount))

}

function dopeCounter(trick, dopeCount) {
    trick.likes++;
    dopeCount.textContent = `Dope: ${trick.likes}`;

    fetch(`${BASE_URL}/${trick.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({likes: trick.likes})
    })
}

function formInfo(event) {
    event.preventDefault();

    const newTrick = {
        name: event.target['name'].value,
        image: event.target['img'].value,
        difficulty: event.target['diff'].value,
        instruction: event.target['inst'].value,
        video: event.target['vid'].value,
        likes: 0,
    }

   

    fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTrick)
    })
    .then(res => res.json())
    .then(trickObj =>  renderTricks(trickObj))


    

    event.target.reset()

}