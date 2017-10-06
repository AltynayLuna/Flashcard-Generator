var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var fs = require("fs");
var inquirer = require("inquirer");

inquirer.prompt([{
    name: "command",
    message: "What would you like to do?",
    type: "list",
    choices: [{
        name: "create-card"
    }, {
        name: "display-cards"
    }]
}]).then(function(answer) {
    if (answer.command === "create-card") {
        createCard();
    } 
    else if (answer.command === "display-cards") {
        displayCards();
    }
});

var createCard = function() {
    inquirer.prompt([{
        name: "cardType",
        message: "What kind of flashcard would you like to create?",
        type: "list",
        choices: [{
            name: "basic"
        }, {
            name: "cloze"
        }]
    }]).then(function(answer) {
        if (answer.cardType === "basic") {
            inquirer.prompt([{
                name: "front",
                message: "Please enter your question.",
            }, {
                name: "back",
                message: "Please enter the answer to this question.",    
            }]).then(function(answer) {
                var newBasic = new BasicCard(answer.front, answer.back);
                newBasic.create();
            });
        } else if (answer.cardType === "cloze") {
            inquirer.prompt([{
                name: "text",
                message: "Please enter the full text.",
            }, {
                name: "cloze",
                message: "Please enter the cloze portion.",
            }]).then(function(answer) {
                var text = answer.text;
                var cloze = answer.cloze;
                if (text.includes(cloze)) {
                    var newCloze = new ClozeCard(text, cloze);
                    newCloze.create();
                } else {
                    console.log("The cloze portion you provided is not valid.");
                    createCard();
                }
            });
        }
    });
};

var displayCards = function() {
    fs.readFile('./log.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        }
        var questions = data.split(';');
        console.log(questions);
    });
};