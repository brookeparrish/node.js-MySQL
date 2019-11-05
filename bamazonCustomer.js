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
    connection.query("SELECT `item_id`, `product_name`, `price` FROM products", function (error, result) {
        if (error) throw error;
        for (i = 0; i < result.length; i++) {
            console.log(`Item ID: ${result[i].item_id}`);
            console.log(`Product Name: ${result[i].product_name}`);
            console.log(`Price: ${result[i].price}`);
            console.log(`----------------------`);
        }
    });
});
