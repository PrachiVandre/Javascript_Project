var inputBox = document.getElementById('input-box');
var listContainer = document.getElementById('listcontainer');

function addTask(){
    if(inputBox.value === ""){
        displayMsg('Please Enter Something', 2000);
    } else {
        error.textContent = "";
        var li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    return true;
}

function displayMsg(msg, duration){
    const errorMessage = document.querySelector('#error');
    errorMessage.innerHTML = msg;
    error.style.visibility = "visible";

    setTimeout(()=>{   
        error.style.visibility = "hidden";
    }, duration);
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        displayMsg('Task Completed', 1000);
        saveData();
    } 
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        displayMsg('Task deleted !', 1000);
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();