const RANDOM_QUOTES_URL = "https://api.quotable.io/random";
const quoteDisplayEl = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerEl = document.getElementById('timer');

quoteInputElement.addEventListener('input', ()=>{
    const arrayQuote = quoteDisplayEl.querySelectorAll('span'); // we have <span> with each character in DOM
    const arrayValue = quoteInputElement.value.split(''); // splitting typed text 
    
    let correct = true;

    arrayQuote.forEach((characterspan, index)=>{
        const character = arrayValue[index];
        if(character == null){
            characterspan.classList.remove('correct');
            characterspan.classList.remove('incorrect');   
            correct = false;
        }
        else if(character === characterspan.innerText){
            characterspan.classList.add('correct');
            characterspan.classList.remove('incorrect');    
        } else {
            characterspan.classList.remove('correct');
            characterspan.classList.add('incorrect');    
            correct = false;
        }
    })
    if(correct) renderNewQuotes();
})

function getRandomQuotes() {
    return fetch(RANDOM_QUOTES_URL)
    .then(res => res.json())
    .then(data => data.content);
}

async function renderNewQuotes() {
    const quote = await getRandomQuotes();
    // console.log(quote) 
    quoteDisplayEl.innerHTML = ''
    quote.split('').map(character => {
        const characterspan = document.createElement('span');
        characterspan.innerText = character;
        quoteDisplayEl.appendChild(characterspan);
    });
    quoteInputElement.value = null;
    timer();
}
renderNewQuotes();

let startTime;
function timer(){
    timerEl.innerText = 0;
    startTime = new Date();
    // console.log("startTime", startTime);
    setInterval(()=>{
        timerEl.innerText = getTimer();
    }, 1000);
}

function getTimer(){
    return Math.floor((new Date() - startTime) / 1000);
}

timer();
