var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var uuid       = require('node-uuid');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'It works!' });   
});

var cars = [
            {
                "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
                "model": "Accord",
                "brand": "Honda",
                "color": "silver",
                "plate_number": "HA1234"
            },
            {
                "id": "6cskrb90-12c4-11e1-840d-7b25c5ee775a",
                "model": "Model S",
                "brand": "Tesla",
                "color": "white",
                "plate_number": "TS2134"
            }
        ];

var drivers = [
            {
                "id": "6c84fb90-12c4-22e1-840d-7b25c5ee775a",
                "first_name": "John",
                "last_name": "Smith",
                "email": "xxx@xx.com",
                "phone_number": "123456789",
                "cars": ["car_0", "ccar_1"],
                "finincal_accounts": ["fa_0"]
            }
        ];

var passengers = [
            {
                "id": "110ec58a-a0f2-4ac4-8393-c866d813b8d1",
                "first_name": "John",
                "last_name": "Smith",
                "email": "xxx@xx.com",
                "phone_number": "123456789",
                "finincal_accounts": ["fa_0"]
            }
        ];

router.route('/car') 
    .get(function(req, res){
        res.json(cars);
    })
    .post(function(req, res){
        var id = uuid.v4();
        var newCar = {}
        newCar.id = id;
        for (var key in req.body) {
            newCar[key] = req.body[key];
        }

        cars.push(newCar);
        console.log("newCar");

        res.json({
            status: "ok",
            data: newCar
        });
        res.end();
    })

router.route('/car/:id/')
    .get(function(req, res){
        var id = req.params.id;

        cars.forEach(function(element) {
            if (element.id == id) {
                res.status(200);
                res.json({
                    status: "ok",
                    data: element
                });
                res.end();
            }
        });

        res.json({
            status: "ok",
            data: "No such car!"
        });
        res.end();
    })
    .patch(function(req, res){
        var id = req.params.id;
        for(var i = cars.length; i--;) {
            if(cars[i].id === id) {
                for (var key in req.body) {
                    cars[i][key] = req.body[key];
                }
            }
        }

        res.json({
            status: "ok",
            data: req.body
        });
        res.end();
    })
    .delete(function(req, res){
        var id = req.params.id;
        var delCar;
        for(var i = cars.length; i--;) {
            if(cars[i].id === id) {
                delCar = cars[i];
                cars.splice(i, 1);
            }
        }

        res.json({
            status: "ok",
            data: delCar,
        });
        res.end();
    });

router.route('/driver') 
    .get(function(req, res){
        res.json(drivers);
    })
    .post(function(req, res){
        var id = uuid.v4();
        var newDriver = {}
        newDriver.id = id;
        for (var key in req.body) {
            newDriver[key] = req.body[key];
        }

        drivers.push(newDriver);
        console.log("newDriver");

        res.json({
            status: "ok",
            data: newDriver
        });
        res.end();
    })

router.route('/driver/:id/')
    .get(function(req, res){
        var id = req.params.id;

        drivers.forEach(function(element) {
            if (element.id == id) {
                res.status(200);
                res.json({
                    status: "ok",
                    data: element
                });
                res.end();
            }
        });

        res.json({
            status: "ok",
            data: "No such driver!"
        });
        res.end();
    })
    .patch(function(req, res){
        var id = req.params.id;
        for(var i = drivers.length; i--;) {
            if(drivers[i].id === id) {
                for (var key in req.body) {
                    drivers[i][key] = req.body[key];
                }
            }
        }

        res.json({
            status: "ok",
            data: req.body
        });
        res.end();
    })
    .delete(function(req, res){
        var id = req.params.id;
        var delDriver;
        for(var i = drivers.length; i--;) {
            if(drivers[i].id === id) {
                delDriver = drivers[i];
                drivers.splice(i, 1);
            }
        }

        res.json({
            status: "ok",
            data: delDriver,
        });
        res.end();
    });

router.route('/driver')
    .get(function(req, res){
        
    })
    .post(function(req, res){
        
    });

router.route('/passenger') 
    .get(function(req, res){
        res.json(passengers);
    })
    .post(function(req, res){
        var id = uuid.v4();
        var newPassenger = {}
        newPassenger.id = id;
        for (var key in req.body) {
            newPassenger[key] = req.body[key];
        }

        passengers.push(newPassenger);
        console.log("newPassenger");

        res.json({
            status: "ok",
            data: newPassenger
        });
        res.end();
    })

router.route('/passenger/:id/')
    .get(function(req, res){
        var id = req.params.id;

        passengers.forEach(function(element) {
            if (element.id == id) {
                res.status(200);
                res.json({
                    status: "ok",
                    data: element
                });
                res.end();
            }
        });

        res.json({
            status: "ok",
            data: "No such passenger!"
        });
        res.end();
    })
    .patch(function(req, res){
        var id = req.params.id;
        for(var i = passengers.length; i--;) {
            if(passengers[i].id === id) {
                for (var key in req.body) {
                    passengers[i][key] = req.body[key];
                }
            }
        }

        res.json({
            status: "ok",
            data: req.body
        });
        res.end();
    })
    .delete(function(req, res){
        var id = req.params.id;
        var delPassenger;
        for(var i = passengers.length; i--;) {
            if(passengers[i].id === id) {
                delPassenger = passengers[i];
                passengers.splice(i, 1);
            }
        }

        res.json({
            status: "ok",
            data: delPassenger,
        });
        res.end();
    });

router.route('/driver')
    .get(function(req, res){
        
    })
    .post(function(req, res){
        
    });


app.use('/api', router);

app.listen(port);
console.log('Service running on port ' + port);