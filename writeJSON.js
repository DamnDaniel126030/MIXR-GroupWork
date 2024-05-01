const { rejects } = require('assert');
const { log } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const { json } = require('stream/consumers');

const folderName = "./image/ingredients";
const filePath = "./ingredient.json";

const jsonArray = [];
let jsonString = "";

const ingredients = ["apple", "berry", "stick", "beetroot", "chicken", "chicken thigh", "sukor", "watermelon", "bowl", "cooked potatoes", "fish", "seaweed", "bread", "seed", "carrot", "rotten meat", "potato", "cooked lamb", "cooked porkchop", "water"];

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

readDirectory(folderName)
    .then((fileNames) => {
        for (let name of fileNames) {
            ingredientImgs.push(name)
        }
        console.log("Aha");
    })
    .catch((error) => {
        console.error("Error reading this directory " + error);
    })

function writeJSONs(){
    for (let i = 0; i < ingredients.length; i++){
        const id = i + 1;
        const name = ingredients[i];
        const img = ingredientImgs[i];
    
        const ingredient = {
            "id": id,
            "name": name,
            "imgName": img
        };
    
        jsonArray.push(ingredient)
    };
    jsonString = JSON.stringify(jsonArray)
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

writeJSONs();

writeJSONFile(filePath, jsonString)
    .then((message) => console.log(message))
    .catch((error) => console.error("Error writing this file " + error));




// const foods = ["Rainbow Special", "Pink Game", ]