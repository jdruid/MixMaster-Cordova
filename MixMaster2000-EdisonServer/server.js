
var restify = require('restify');
var mraa = require('mraa');

//Using Cylon to control the sensors
var Cylon = require('cylon');

var SERVER_PORT = 8800;
var server = restify.createServer({ name: 'MixMasterAPI', version: '1.0.0' });
server.use(restify.bodyParser());

var drinkName = "drink name"
var drinkIngredients = {};
var counter = 0;

var displayHandler = function (screen, text) {
    console.log("Setting text " + text);
    screen.write("");
    screen.setCursor(0, 0);
    screen.write(text);
}


var serverHandler = function () {
    console.log("MixMaster2000 REST webservice running on " + server.url);
}


Cylon
  .robot()
  .connection('edison', { adaptor: 'intel-iot' })
  .device('led', { driver: 'led', pin: 4, connection: 'edison' })
  .device('touch', { driver: 'button', pin: 3, connection: 'edison' })
  .device('screen', { driver: 'upm-jhd1313m1', connection: 'edison' })
  .on('ready', function (my) {
    
    //Handle Touch
    my.touch.on('release', function () {
        //Need to move to NEXT ingredient
        console.log("Touched");
        if (counter < drinkIngredients.length) {
            var ingredient = drinkIngredients[counter].textPlain;
            displayHandler(my.screen, ingredient);
            counter++;
        } else {
            displayHandler(my.screen, "Enjoy");
        }

    });
    
    //Handle no touch
    my.touch.on('press', function () {
        console.log("Touched Release");
    });

    server.post("/drinks/steps", function (req, res, next) {
        
        var drink = req.body.drink;
        console.log(drink.name);
        drinkName = drink.name;
        drinkIngredients = drink.ingredients;
        res.send(200);
        
        displayHandler(my.screen, drinkName);
        
        my.led.turnOn();

    });
    
    server.listen(SERVER_PORT, serverHandler);

});

Cylon.start();

