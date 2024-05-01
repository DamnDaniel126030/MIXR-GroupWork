const { rejects } = require('assert');
const { log } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const { json } = require('stream/consumers');

const ingredients = ["apple", "berry", "stick", "beetroot", "chicken", "chicken thigh", "sukor", "watermelon", "bowl", "cooked potatoes", "fish", "seaweed", "bread", "seed", "carrot", "rotten meat", "potato", "cooked lamb", "cooked porkchop", "water"];

const jsonArray = [];

const filePath = "./ingredient.json";

for (let i = 0; i < ingredients.length; i++){
    const id = i + 1;
    const name = ingredients[i];

    const ingredient = {
        "id": id,
        "name": name
    };

    jsonArray.push(ingredient)
};

const jsonString = JSON.stringify(jsonArray)

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

writeJSONFile(filePath, jsonString + "\n")
    .then((message) => console.log(message))
    .catch((error) => console.error("Error writing this file" + error));
