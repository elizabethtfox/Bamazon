var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var clear = require('clear');


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
    clear();
    options();
});

function options(){
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: " What would you like to do?",
            choices: [
                {
                    key: 'a',
                    name: 'View Products for Sale',
                    value: 'view_products'
                },
                {
                    key: 'b',
                    name: 'View Low Inventory',
                    value: 'view_low'
                },
                {
                    key: 'c',
                    name: 'Add to Inventory',
                    value: 'add_inventory'
                },
                {
                    key: 'd',
                    name: 'Add New Product',
                    value: 'add_product'
                }
            ]
        }
    ]).then(function (answer){
        if (answer.action === 'view_products'){
            displayProducts();
        }else if (answer.action === 'view_low'){
            displayLow();
        }else if (answer.action === 'add_inventory'){
            addInventory();
        }else if (answer.action === 'add_product'){
            addProduct();
        }
    });
}

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var table = new Table({
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            },
            head: ['Id', 'Name', 'Price', 'Quantity']
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, "$" + res[i].price, res[i].stock_quantity]);
        }
        console.log("\nCurrent Products");
        console.log(table.toString());
        connection.end();
    });
}

function displayLow(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res){
        var table = new Table({
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            },
            head: ['Id', 'Name', 'Price', 'Quantity']
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, "$" + res[i].price, res[i].stock_quantity]);
        }
        console.log("\nLow Quantity Products");
        console.log(table.toString());
        connection.end();
    })
}

function addInventory(){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: " Which item ID do you want to increase the quantity of?"
        },
        {
            name: "amount",
            type: "input",
            message: " How many units would you like to add?"
        }
    ]).then(function(answer){
        connection.query("SELECT * FROM products WHERE ?",
            {
                item_id: answer.id
            }, function(err, res){
            if (err) throw err;

            if (typeof res != "undefined" && res != null && res.length > 0) {
                var newQuantity = res[0].stock_quantity + parseInt(answer.amount);
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: answer.id
                        }
                    ], function (err,res){
                        console.log("\n Added " + answer.amount);
                    });
            } else{
                console.log(" " + answer.id + " is not a valid ID.")
            } connection.end();
        });
    });
}

function addProduct(){
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: " What is the name of the product you want to add?"
        },
        {
            name: "dept",
            type: "input",
            message: " What department should the product go in?"
        },
        {
            name: "price",
            type: "input",
            message: " What is the price of the product?"
        },
        {
            name: "quantity",
            type: "input",
            message: " How many units of the product are in stock?"
        }
    ]).then(function(answer){
        connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.name,
                department_name: answer.dept,
                price: answer.price,
                stock_quantity: answer.quantity
            }, function(err, res){
                console.log("\n New product has been added");
                connection.end();
            });
    });
}