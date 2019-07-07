var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"0979776892",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

var displayProducts = function(){
    
    // I used CLI TABLE TO DISPLAY ITEM DATA

	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["ID", "Product Name", "Catergory", "Price", "Quantity"],
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].id, res[i].product, res[i].department, res[i].price, res[i].stock]
			);
		}
		console.log(displayTable.toString());
		purchasePrompt();
	});
}

function purchasePrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Enter the Item ID number",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"Enter Purchase Quantity",
		filter:Number
	},

 ]).then(function(answers){
 	var howmuch = answers.Quantity;
 	var item_id= answers.ID;
 	purchaseOrder(item_id, howmuch);
 });
};

function buyAgain(){
    inquirer.prompt(
        {
            name: "answer",
            type: "input",
            message:"Would You Like To Purchase Another Product? y/n"
        }
    ).then(function(respond){
        if (respond.answer=='y'){
            displayProducts();
        }
        else {
            console.log(".............................................")
            console.log("Pleasure doing business with you!")
            console.log(".............................................")
        }
    });
};

function purchaseOrder(ID, amount){
	connection.query('Select * FROM products WHERE id = ?', [ID], function(err,res){
		if(err){console.log(err)};
		if(amount <= res[0].stock){
            var totalCost = res[0].price * amount;
            console.log(".............................................")
            console.log("Your total cost for " + amount + " " + res[0].product + " is " + totalCost + " Thank you!");
            console.log(".............................................")            
            var stock = res[0].stock - amount;
            connection.query("UPDATE products SET stock = ? WHERE id = ?", [stock,ID]);
            buyAgain();
		} else{
			console.log("Insufficient quantity, sorry we do not have enough " + res[0].product + "to complete your order.");
            buyAgain();
        };
		
	});
};

displayProducts(); 