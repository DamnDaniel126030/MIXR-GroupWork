document.addEventListener("DOMContentLoaded", ()=>{
    

    async function getDatas(){
        await fetch('./ingredient.json')
        .then((response) => response.json())
        .then((data) => createButton(data));
    }
    

    function createButton(data){

        let buttons = "";
        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            let button = 
            `
            <div class="ingredient-button">
                <img src= ${"./image/ingredients/"+element.imgName+""} alt="">
                <p>${element.name}</p>
            </div>
            `;
            
            buttons += button;
        }
        document.getElementById("ingredient").innerHTML = buttons;

        
        

    }
   
    getDatas();

    

})