const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const btn = document.querySelector('#getQuote');

const api_url = "https://api.quotable.io/random";

async function getQuote(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}

getQuote(api_url);

btn.addEventListener('click', () => {
    getQuote(api_url);
});


