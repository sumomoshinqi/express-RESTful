/** 
 * Express Route: /cars
 * @author Clark Jeria
 * @version 0.0.2
 */
var express = require('express');
var router = express.Router();

var Car = require('../app/models/car');

var propList = ['license', 'make', 'model', 'doorCount', 'driver'];

router.route('/cars') 
    /**
     * GET call for the car entity (multiple).
     * @returns {object} A list of cars. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Car.find(function(err, cars){
            if(err){
                res.status(500).send({
                    "errorCode" : 1007,
                    "errorMsg" : 'No car data',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                res.json(cars);
            }
        });
    })
    /**
     * POST call for the car entity.
     * @param {string} license - The license plate of the new car
     * @returns {object} A message and the car created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        var car = new Car();
        
        for (var key in req.body) {
            if (propList.indexOf(key) === -1) {
                res.status(400).send({
                    "errorCode" : 1005,
                    "errorMsg" : 'Invalid property name ' + key,
                    "statusCode" : 400,
                    "statusTxt" : 'Bad Request'
                })
            }
            else
                car[key] = req.body[key];
        }

        car.save(function(err){
            if(err){
                res.status(500).send({
                    "errorCode" : 1005,
                    "errorMsg" : 'Invalid value in car',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                res.status(201).json({"message" : "Car Created", "car_created" : car});
            }
        });
    });

/** 
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/cars/:car_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(500).send({
                    "errorCode" : 1002,
                    "errorMsg" : 'Given car does not exist',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                res.json(car);
            }
        });  
    })
    /**
     * PATCH call for the car entity (single).
     * @returns {object} A message and the car updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(500).send({
                    "errorCode" : 1002,
                    "errorMsg" : 'Given car does not exist',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                for (var key in req.body) {
                    if (propList.indexOf(key) === -1) {
                        res.status(400).send({
                            "errorCode" : 1005,
                            "errorMsg" : 'Invalid property name ' + key,
                            "statusCode" : 400,
                            "statusTxt" : 'Bad Request'
                        })
                    }
                    else
                        car[key] = req.body[key];
                }
                car.save(function(err){
                    if(err){
                        res.status(500).send({
                            "errorCode" : 1005,
                            "errorMsg" : 'Invalid value in car',
                            "statusCode" : 500,
                            "statusTxt" : 'Mongoose Database Error'
                        });
                    }else{
                        res.json({"message" : "Car Updated", "car_created" : car});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the car entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        Car.remove({
            _id : req.params.car_id
        }, function(err, car){
            if(err){
                res.status(500).send({
                    "errorCode" : 1002,
                    "errorMsg" : 'Given car does not exist',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'                   
                });
            }else{
                res.json({"message" : "Car Deleted"});
            }
        });
    });

module.exports = router;