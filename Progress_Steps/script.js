const progressBox = document.getElementById('progress');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const circleBox = document.querySelectorAll('.circle');

let activeLink = 1;

nextBtn.addEventListener('click', ()=>{
    activeLink++;
    if(activeLink > circleBox.length){
        activeLink = circleBox.length;
    }
    //console.log(activeLink);
    update();
})

prevBtn.addEventListener('click', ()=>{
    activeLink--;
    if(activeLink < 1 ){
        activeLink = 1;
    }
    //console.log(activeLink);
    update();
})

const update = () => {
    console.log(activeLink);
    circleBox.forEach((circle, index)=>{
        if(index < activeLink){
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    const actives = document.querySelectorAll('.active');
    progressBox.style.width = (actives.length-1) / (circleBox.length-1) * 100 + '%';

    if(activeLink === 1){
        prevBtn.disabled = true; 
    } else if(activeLink === circleBox.length){
        nextBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

