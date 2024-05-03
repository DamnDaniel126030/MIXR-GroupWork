document.addEventListener("DOMContentLoaded", ()=>{
    function getIngredientData(){
        fetch('./ingredient.json')
        .then((response) => response.json())
        .then((data) => createButton(data));
    };
    
    getIngredientData();

    function createButton(ingredient_data){
        let buttons = "";
        for (let index = 0; index < ingredient_data.length; index++) {
            const element = ingredient_data[index];
            let button = 
            `
                <button onclick="ingredientAdds('${element.name}','${element.imgName}')" class="ingredient-button">
                    <img style="width: 40px" src= ${"./image/ingredients/"+element.imgName+""} alt="">
                    <p >${element.name}</p>
                </button>
            `;
            
            buttons += button;
        }

        document.getElementById("ingredient").innerHTML = buttons;
    };

    function getFoodData(){
        fetch('./food.json')
        .then((response) => response.json())
        .then((data) => addToArrayIngredient(data))
    };
    
    getFoodData();
    
    const ingredientNeededArray = [];
    
    function addToArrayIngredient(food_data){
        for (let index = 0; index < food_data.length; index++) {
            const element = food_data[index];
            ingredientNeededArray.push(element);      
        }
    };
    
    let index= 1
    let ingredient_name_array = [];

    function ingredientAdds(ingredient_name, imagePath){
        if(ingredient_name_array.length <= 4 ){
            ingredient_name_array.push(ingredient_name);    
            document.getElementById(index+"").innerHTML  += 
            `
                <img style="width: 100px; height: 100px"  src= ${"./image/ingredients/"+imagePath+""} alt="">
            `
            index++;
        }
        else{
            alert("Nem lehet négynél több hozzávalót használni!")
        }
    };

    function mixrButton(){
        let boolean = false;
        ingredientNeededArray.forEach(element => {
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
                    <img style="width: 100px; height: 100px"  src= ${"./image/foods/"+element.imgName+""} alt="">
                    <p>${element.name}</p>
                `
                document.getElementById("previouslyFood").innerHTML += 
                `
                    <img style="width: 100px; height: 100px"  src= ${"./image/foods/"+element.imgName+""} alt="">
                    <p>${element.name}</p>
                `

                document.getElementById("1").innerHTML  = "";
                document.getElementById("2").innerHTML  = "";
                document.getElementById("3").innerHTML  = "";
                document.getElementById("4").innerHTML  = "";
                    
                boolean = true;
            };
        });
        if(!boolean){
            alert("nincs ilyen opció");
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
           

        
    }

    function  removeButton(){
        ingredient_name_array = [];
            index= 1;
            document.getElementById("1").innerHTML  = "";
            document.getElementById("2").innerHTML  = "";
            document.getElementById("3").innerHTML  = "";
            document.getElementById("4").innerHTML  = "";
    }

    
  
   
    window.removeButton = removeButton;
    window.mixrButton = mixrButton;
    window.ingredientAdds = ingredientAdds;
})