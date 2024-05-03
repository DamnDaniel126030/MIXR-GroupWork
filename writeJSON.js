const { rejects } = require('assert');
const { log } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const { json } = require('stream/consumers');

const folderNameIngredients = "./image/ingredients";
const filePathIngredients = "./ingredient.json";

const jsonArrayIngredients = [];
let jsonStringIngredients = "";

const ingredients = ["apple", "berry", "stick", "beetroot", "chicken", "chicken thigh", "sugar", "watermelon", "bowl", "cooked potatoes", "fish", "seaweed", "bread", "seed", "carrot", "rotten meat", "potato", "cooked lamb", "cooked porkchop", "water"];

let ingredientImgs = [];

function readDirectory(folderName){
    return new Promise((resolve, rejects) => {
        fs.readdir(folderName, (error, fileNames) => {
            if (error) {
                rejects(error)
            }
            else{
                resolve(fileNames)
            }
        });
    });
};

readDirectory(folderNameIngredients)
    .then((fileNames) => {
        for (let name of fileNames){
            ingredientImgs.push(name);
        }
        console.log("OK");
        writeJSONsIngredients();
    })
    .catch((error) => {
        console.error("Error reading this directory " + error);
    })

function writeJSONsIngredients(){
    for (let i = 0; i < ingredients.length; i++){
        const id = i + 5;
        const name = ingredients[i];
        const img = ingredientImgs[i];
    
        const ingredient = {
            "id": id,
            "name": name,
            "imgName": img
        };
    
        jsonArrayIngredients.push(ingredient)
    };
    jsonStringIngredients = JSON.stringify(jsonArrayIngredients)
    writeJSONFile(filePathIngredients, jsonStringIngredients)
        .then((message) => console.log(message))
        .catch((error) => console.error("Error writing this file " + error));
}


function writeJSONFile (filePath, data){
    return new Promise((resolve, rejects) => {
        fs.writeFile(filePath, data, (error) => {
            if (error){
                rejects(error);
            }
            else{
                resolve('OK')
            }
        });
    });
};

//  Ingredients done
// Now for the foods:

const folderNameFoods = "./image/foods";
const filePathFoods = "./food.json";

const foods = ["Rainbow Special", "Pink Hunter", "Pink Carrot Stew", "Chicken Sandwich", "Orange Hunter", "Sweet Apple Pálinka", "Potato Rainbow Stew", "Yellow Hunter", "Skewer", "Sushi", "Stuffed Chicken"];

const ingredientsNeeded = [["apple", "watermelon", "berry", "rotten meat"], ["beetroot", "chicken thigh", "bowl"], ["beetroot", "chicken thigh", "carrot", "bowl"], ["chicken", "bread"], ["chicken thigh", "carrot", "bowl"], ["sugar", "apple", "water"], ["potato", "carrot", "beetroot", "bowl"], ["cooked potatoes", "chicken thigh", "carrot"], ["chicken", "cooked lamb", "cooked porkchop", "stick"], ["seaweed", "fish"], ["chicken", "carrot", "potato", "seed"]];



const jsonArrayFoods = [];
let jsonStringFoods = "";

let foodImgs = [];

readDirectory(folderNameFoods)
    .then((fileNames) => {
        for (let name of fileNames){
            foodImgs.push(name);
        }
        console.log("OK");
        writeJSONsFoods();
    })
    .catch((error) => {
        console.error("Error reading this directory " + error);
    })

function writeJSONsFoods(){
    for (let i = 0; i < foods.length; i++){
        const id = i + 5;
        const name = foods[i];
        const img = foodImgs[i];
        const ingredientNeeded = ingredientsNeeded[i];

        const food = {
            "id": id,
            "name": name,
            "imgName": img,
            "ingredientNeeded": ingredientNeeded
        };

        jsonArrayFoods.push(food);
    };
    jsonStringFoods = JSON.stringify(jsonArrayFoods)
    writeJSONFile(filePathFoods, jsonStringFoods)
        .then((message) => console.log(message))
        .catch((error) => console.error("Error writing this file " + error));
}