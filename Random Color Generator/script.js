const btn = document.getElementById('btn');
const box = document.getElementById('main');
const colorCode = document.getElementById('color-code');

function getColor(){
    const randomColor = Math.floor(Math.random() * 16777215);
    const randomCode = `#${randomColor.toString(16)}`;
    document.body.style.background = randomCode;
    colorCode.innerText = randomCode;

    navigator.clipboard.writeText(randomCode);
}

btn.addEventListener('click', getColor);
getColor();
