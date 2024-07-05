const panelBox = document.querySelectorAll('.panel');

panelBox.forEach((panel) => {
    panel.addEventListener('click', ()=>{
        removeClass();
       panel.classList.add('active');
    })
})

const removeClass = () => {
    panelBox.forEach((item)=>{
        item.classList.remove('active');
    })
}