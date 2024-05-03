document.addEventListener("DOMContentLoaded", ()=>{
    async function getIngredientData(){
        await fetch('./ingredient.json')
            .then((response) => response.json())
            .then((data) => createButton(data));
    };
    
    getIngredientData();

    const ingredientArray = [];

    function createButton(ingredient_data){
        let buttons = "";
        for (let index = 0; index < ingredient_data.length; index++) {
            const element = ingredient_data[index];
            ingredientArray.push(element);
            let button = 
            `
            <button id="${element.id}" onclick="ingredientAdds('${element.name}','${element.imgName}')" class="ingredient-button">
                <img style="width: 40px" src= ${"./image/ingredients/"+element.imgName+""} alt="">
                <p >${element.name}</p>
            </button>
            `;
            
            buttons += button;
        }

        document.getElementById("ingredient").innerHTML = buttons;
    };

    async function getFoodData(){
        await fetch('./food.json')
            .then((response) => response.json())
            .then((data) => addToArrayIngredient(data))
    };
    
    getFoodData();
    
    const foodArray = [];
    let ingredientNeededArray = [];
    
    function addToArrayIngredient(food_data){
        for (let index = 0; index < food_data.length; index++) {
            const element = food_data[index];
            foodArray.push(element);
            ingredientNeededArray.push(element["ingredientNeeded"])
        };
    };
    
    let index= 1
    let ingredient_name_array = [];

    let usedRecipes = [];
    let usedIngredients = [];
    let usedIngredientsUnique = [];
    let toDisableIgredients = [];

    function ingredientAdds(ingredient_name, imagePath){
        if(ingredient_name_array.length < 4 ){
            ingredient_name_array.push(ingredient_name);    
            document.getElementById(index+"").innerHTML  += 
            `
                <img style="width: 100px; height: 100px"  src= ${"./image/ingredients/"+imagePath+""} alt="">
            `
            index++;
            ingredientNeededArray.forEach(recipe => {
                if (recipe.includes(ingredient_name)){
                    usedRecipes.push(recipe)
                }
            });
            usedRecipes.forEach(recipe => {
                recipe.forEach(ingredient => {
                    usedIngredients.push(ingredient)
                });
            });
            usedIngredientsUnique = [...new Set(usedIngredients)];
            console.log(usedIngredientsUnique);

            ingredientArray.forEach(item => {
                if (!usedIngredientsUnique.includes(item.name)){
                    toDisableIgredients.push(item.name)
                };
            });

            toDisableIgredients.forEach(ingredient => {
                const id = findId(ingredient);
                const button = document.getElementById(id);
                button.classList.add("d-none");
            });

            toDisableIgredients = [];
            usedRecipes = [];
            usedIngredients = [];
            usedIngredientsUnique = [];
        }
        else{
            alert("Cannot add more than 4 ingredients!")
            document.getElementById("1").innerHTML  = "";
            document.getElementById("2").innerHTML  = "";
            document.getElementById("3").innerHTML  = "";
            document.getElementById("4").innerHTML  = "";
            index= 1;
            ingredient_name_array = [];
        }
    };

    function findId(ingredientName){
        let i = 0;
        while (i < ingredientArray.length && ingredientArray[i].name != ingredientName){
            i++;
        };
        if (i < ingredientArray.length){
            return ingredientArray[i].id
        };
    };

    function enableButtons(){
        for(let i = 0; i < ingredientArray.length; i++){
            document.getElementById(i + 5).classList.remove("d-none");
        }
    };

    function mixrButton(){
        let boolean = false;
        foodArray.forEach(element => {
        let difference
            if(element["ingredientNeeded"].length <= ingredient_name_array.length){
                difference =  ingredient_name_array.filter((ingredientNeeded) => !element["ingredientNeeded"].includes(ingredientNeeded));
            }
            if(element["ingredientNeeded"].length >= ingredient_name_array.length){
                
                difference =  element["ingredientNeeded"].filter((ingredientNeeded) => !ingredient_name_array.includes(ingredientNeeded));
            }        
            if(difference.length == 0){
                document.getElementById("craftedFood").innerHTML = 
                `
                    <img style="width: 150px; height: 150px"  src= ${"./image/foods/"+element.imgName+""} alt="">
                    <p>${element.name}</p>
                `
                document.getElementById("previouslyFood").innerHTML += 
                `   <div style="background-image: url('image/pageimages/itemframe.webp'); background-size: cover; background-repeat: no-repeat; width: 150px; height: 150px;">
                        <div>
                            <img style="width: 100px; height: 100px"  src= ${"./image/foods/"+element.imgName+""} alt="">
                            <p>${element.name}</p>
                        </div>
                    </div>
                `

                document.getElementById("1").innerHTML  = "";
                document.getElementById("2").innerHTML  = "";
                document.getElementById("3").innerHTML  = "";
                document.getElementById("4").innerHTML  = "";
                    
                boolean = true;
            };
        });
        if(!boolean){
            alert("No recipe found with these ingredients!");
            ingredient_name_array = [];
            index= 1;
            document.getElementById("1").innerHTML  = "";
            document.getElementById("2").innerHTML  = "";
            document.getElementById("3").innerHTML  = "";
            document.getElementById("4").innerHTML  = "";
        }else{
            index= 1
            ingredient_name_array = [];
        }
        
        enableButtons();
    }

    function  removeButton(){
        ingredient_name_array = [];
            index= 1;
            document.getElementById("1").innerHTML  = "";
            document.getElementById("2").innerHTML  = "";
            document.getElementById("3").innerHTML  = "";
            document.getElementById("4").innerHTML  = "";

        enableButtons();
    };

    
  
   
    window.removeButton = removeButton;
    window.mixrButton = mixrButton;
    window.ingredientAdds = ingredientAdds;
})