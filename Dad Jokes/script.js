const jokeEl = document.querySelector('#joke');
const jokeBtn = document.querySelector('#jokeBtn');


/* Using Fetch Method */
// const generateJoke = () => {
//     const config = {
//         headers: {
//             'Accept': 'application/json'
//         }
//     }
//     fetch('https://icanhazdadjoke.com', config)
//     .then(res => res.json())
//     .then(data => {
//         jokeEl.innerHTML = data.joke;
//     });
// }

/* Using Async and Await */
async function generateJoke() {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }
    const res = await fetch('https://icanhazdadjoke.com', config)
    const data =  await res.json();
    jokeEl.innerHTML = data.joke;
}

jokeBtn.addEventListener('click', generateJoke);

generateJoke();
