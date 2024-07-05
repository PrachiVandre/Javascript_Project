const questions = [
    {
        "que": "Which of the following is markup langugage?",
        "a" : "HTML", 
        "b" : "CSS", 
        "c" : "Javascript", 
        "d" : "React",
        "correct": "a" 
    },
    {
        "que": "What year was Javascript launched",
        "a" : "1996", 
        "b" : "1995", 
        "c" : "1994", 
        "d" : "None of the above",
        "correct": "b" 
    },
    {
        "que": "What does css stand for?",
        "a" : "Hypetext Markup Language", 
        "b" : "Cascading Style Sheets", 
        "c" : "Jason Object Notation", 
        "d" : "None of the above",
        "correct": "b" 
    }
]

let index = 0;
let total = questions.length;
let wrong = 0, right = 0;

const queBox = document.querySelector('#queBox');
const options = document.querySelectorAll('.options');
const retest = document.querySelector('.retest');

const loadQue = () => {
    if(index === total){
        return endQuiz();
    }

    reset();
    
    const data = questions[index];
    queBox.innerText = `${index + 1}) ${questions[index].que}`;

    options[0].nextElementSibling.innerText = data.a;
    options[1].nextElementSibling.innerText = data.b;
    options[2].nextElementSibling.innerText = data.c;
    options[3].nextElementSibling.innerText = data.d;
}

const submitQuiz = () => {
    const data = questions[index];
    const ans = getAnswer();

    if(ans === data.correct){
        right++
    } else {
        wrong++
    }
    index++;
    loadQue();
    return;
}

const getAnswer = () => {
    let answers;
    options.forEach(
        (input) => {
            if(input.checked){
                answers = input.value;
            }
        }
    )
    return answers;
}

const reset = () => {
    options.forEach(
        (input)=>{
            input.checked = false;
        }
    )
}

const endQuiz = () => {
    document.querySelector('#box').innerHTML = `
        <div style="text-align:center">
            <h3>Thanks for the applying test!</h3>
            <h2 style="color:green">${right}/ ${total} are correct </h2>
        </div>
    `
}

loadQue();
