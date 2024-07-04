const upperset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerset = "abcdefghijklmnopqrstuvwxyz";
const numberset = "1234567890";
const symbolset = "!_@#$ %^&*()+";

// create selector
let passwrap = document.getElementById('pass-box');
const total = document.getElementById('total-char');
const uppercase = document.getElementById('upper-case');
const lowercase = document.getElementById('lower-case');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');


const getRandomData = (dataset) => {
    return dataset[Math.floor(Math.random() * dataset.length)]
}

const generatePass = (password ="")=> {
    if(uppercase.checked){
        password += getRandomData(upperset);
    }
    if(lowercase.checked){
        password += getRandomData(lowerset);
    }
    if(numbers.checked){
        password += getRandomData(numberset);
    }
    if(symbols.checked){
        password += getRandomData(symbolset);
    }
    if(password.length < total.value){
        return generatePass(password);
    }
    passwrap.innerText = truncateString(password, total.value);
}


document.getElementById('btn').addEventListener('click',()=>{
    generatePass();
})

//truncate string function ( stack overflow: https://stackoverflow.com/questions/1301512/truncate-a-string-straight-javascript)
function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  }