document.addEventListener("DOMContentLoaded", ()=>{
    

    function getIngredientData(){
        fetch('./ingredient.json')
        .then((response) => response.json())
        .then((data) => createButton(data));
    }
    
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

        
        

    }
    function getFoodData(){
        fetch('./food.json')
        .then((response) => response.json())
        .then((data) => addToArrayIngredient(data))
    }
    
    getFoodData();


    const ingredientNeededArray = [];
    const foodImgArray = [];
    
    function addToArrayIngredient(food_data){
        for (let index = 0; index < food_data.length; index++) {
            const element = food_data[index];
            ingredientNeededArray.push(element.ingredientNeeded);
            foodImgArray.push(element.imgName);
            
        }
    }

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
        }else{
            
            alert("Nem lehet négynél több hozzávalót használni!")

        
           
        }

        
        
        

    }

    
  
   

    
    window.ingredientAdds = ingredientAdds;
})