document.addEventListener("DOMContentLoaded", ()=>{
    

    

    function createButton(data){

        let buttons = "";

        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            let button = 
            `
            <div class="ingredient-button">
                <img src= ${element.image} alt="">
                <p>${element.name}</p>
            </div>
            `;
            
            buttons += button;
        }
        document.getElementById("ingredient").innerHTML = buttons;

        
        

    }
    createButton(data);



    
    

})