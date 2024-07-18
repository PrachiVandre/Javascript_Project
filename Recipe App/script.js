const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const closeBtn = document.querySelector('#close');
const popupcontainer = document.querySelector('.recipe-content');
const reciepeDetails = document.querySelector('#overlay');


recipeContainer.innerHTML = `
    <div class="loadingData">
        <h2>Healthy but still fabulously tasty</h2>
        <h3>Find the Reciepes !</h3>
    </div>
`

//function to get recipes
const fetchRecipes = async(query) =>{
    recipeContainer.innerHTML = "<h2 style='color:'#fff''>Fetching Recipes...</h2>"
    try{
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await result.json();
    
    recipeContainer.innerHTML = ""
    response.meals.map(meal => {
        const{strMealThumb, strMeal, strArea, strCategory} = meal;
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
                <img src="${strMealThumb}"/>
                <h3>${strMeal}</h3>
                <div class="desc">
                    <p>${strArea}</p>
                    <p>${strCategory}</p>   
                </div>
        `
        const viewbtn = document.createElement('button');
        viewbtn.textContent = "View Reciepe";
        recipeDiv.appendChild(viewbtn);

        //Adding Eventlistener to the button
        viewbtn.addEventListener('click', ()=>{
            openRecipePopup(meal);
            reciepeDetails.style.display = "block";
        })

        recipeContainer.appendChild(recipeDiv);
    })
    }
     catch(error){
         recipeContainer.innerHTML = "<h2 style='color:'#fff''>Error in fetching recipes...</h2>"
     }
}

const fetchIngredients = (meal) => {
    let allIngredients = "";

    for(let i=1; i<=20; i++){
       
        const ingredient = meal[`strIngredient${i}`];
        console.log("meal", meal);
        if(ingredient){
            const measurements = meal[`strMeasure${i}`];
            allIngredients += `<li>${measurements} ${ingredient}</li>`
        } else {
            break;
        }
    }
    return allIngredients;
}

const openRecipePopup = (meal) => {
   
    popupcontainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <br />
        <h3>Ingredients:</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    popupcontainer.parentElement.style.display = "block";
}


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`
        return;
    }
    fetchRecipes(searchInput);
    searchBox.value = ""
});

const closePopup = () => {
    popupcontainer.parentElement.style.display = "none";
    reciepeDetails.style.display = "none";
}