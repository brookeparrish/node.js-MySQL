const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (error) {
    if (error) throw error;

    connection.query("SELECT item_id, product_name, price FROM products", function (error, results) {
        if (error) throw error;
        for (i = 0; i < results.length; i++) {
            console.log(`Item ID: ${results[i].item_id}`);
            console.log(`Product Name: ${results[i].product_name}`);
            console.log(`Price: ${results[i].price}`);
            console.log(`----------------------`);
        }
        productToBuy();
    });
});

function productToBuy() {
    inquirer
        .prompt([
            {
                name: "productID",
                type: "number",
                message: "What is the Item ID of the product you would like to purchase?",
            },
            {
                name: "quantity",
                type: "number",
                message: "How many units of the product would you like to buy?"
            }
        ])
        .then(function (answer) {
            connection.query(`SELECT stock_quantity FROM products WHERE item_id = ${answer.productID}`, function (error, results) {
                if (error) throw error;
                if (results === undefined || results.length == 0) {
                    console.log("Please select a valid ID");
                }
                else if (answer.quantity > results[0].stock_quantity) {
                    console.log("I'm sorry, there are not that many items available.");
                } else {
                    console.log("Congratulations!");
                }
            });
            connection.end(function(err) {
              });
        });

}

