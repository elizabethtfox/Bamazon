var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    listProducts();
});

function listProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var table = new Table({
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            },
            head: ['Id', 'Name', 'Price']
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, "$" + res[i].price]);
        }
        console.log("\n============Welcome to Bamazon============");
        console.log(table.toString());
        promptToBuy()
    });
}

function promptToBuy(){
    inquirer.prompt([
        {
            name: "ask",
            type: "confirm",
            message: " Do you want to spend some money?"
        }
    ]).then(function(answer){
        if(answer.ask === true){
            buyItem();
        } else{
            console.log("\nOkay. Maybe another time.")
            connection.end();
        }
    });
}

function buyItem(){
    inquirer.prompt([
        {
            name: "buy",
            type: "input",
            message: " What is the ID of the product you want to buy?"
            // validate: function (value) {
            //     var reg = /^\d+$/;
            //     return reg.test(value) || "Id should be a number!";
            // }
        },
        {
            name: "quantity",
            type: "input",
            message: " How many would you like to order?"
            // validate: function(value){
            //     if (isNaN(value) === false){
            //         return true;
            //     } return false;
            // }
        },
    ]).then(function(answer){
        connection.query("SELECT * FROM products WHERE ?",
            {
                item_id: answer.buy
            }, function(err, res){
            if (err) throw err;
            // console.log(answer.id);
            // console.log(res);
            if (res[0].stock_quantity >= answer.quantity){
                console.log("\n Purchase Complete!!");

                //Update Database
                var newQuantity = res[0].stock_quantity - parseInt(answer.quantity);
                var totalCost = parseInt(answer.quantity) * res[0].price;

                updateQuantity(answer.buy, newQuantity)
                console.log("\n Total Cost: $" + totalCost);
                promptToBuy();
            } else {
                console.log("\n Not enough in stock");
                promptToBuy();
            }
        });
    });
}

function updateQuantity(buy, quantity){
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity
            },
            {
                item_id: buy
            }
        ], function (err,res){

        });
}
