
const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the ShoppingList and Recipes model, which we'll
// interact with in our GET endpoint
const {ShoppingList, Recipes} = require('./models');


const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList and Recipes
// so there's some data to look at. Note that 
// normally you wouldn't do this. Usually your
// server will simply expose the state of the
// underlying database.
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);


Recipes.create(
	'protien shake', 
	['coconut almond milk', 'choc whey protien powder', 'banana', 'peanutbutter powder', 'stevia']);
Recipes.create(
	'delish salmon', 
	['salmon', 'honey', 'soy sauce', 'green onion', 'minced garlic']);
Recipes.create(
	'salad', 
	['tomatoes', 'green onion', 'cucumber', 'parsley', 'salt', 'lemon']);


// when the root of this route is called with GET, return
// all current ShoppingList items by calling `ShoppingList.get()`
// all current Recipes items by calling `Recipes.get()`
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

app.get('/recipes', (req, res) => {
  res.json(Recipes.get());
})



app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
