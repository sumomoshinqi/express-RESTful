/** 
 * Express Route: /passengers
 * @author Clark Jeria
 * @version 0.0.2
 */
var express = require('express');
var router = express.Router();

var Passenger = require('../app/models/passenger');

var propList = ['name', 'firstName', 'lastName', 'emailAddress', 'password', 'addressLine1', 'addressLine2', 'city', 'state', 'zip', 'phoneNumber'];

router.route('/passengers') 
    .get(function(req, res){
        passenger.find(function(err, passengers){
            if(err){
                res.status(500).send({
                    "errorCode" : 1009,
                    "errorMsg" : 'No passenger data',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                res.json(passengers);
            }
        });
    })
    .post(function(req, res){
        var passenger = new Passenger();
        
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
                passenger[key] = req.body[key];
        }

        passenger.save(function(err){
            if(err){
                res.status(500).send({
                    "errorCode" : 1005,
                    "errorMsg" : 'Invalid value in passenger',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                res.status(201).json({"message" : "passenger Created", "passenger_created" : passenger});
            }
        });
    });

router.route('/passengers/:passenger_id')
    .get(function(req, res){
        passenger.findById(req.params.passenger_id, function(err, passenger){
            if(err){
                res.status(500).send({
                    "errorCode" : 1004,
                    "errorMsg" : 'Given passenger does not exist',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                res.json(passenger);
            }
        });  
    })
    .patch(function(req, res){
        passenger.findById(req.params.passenger_id, function(err, passenger){
            if(err){
                res.status(500).send({
                    "errorCode" : 1004,
                    "errorMsg" : 'Given passenger does not exist',
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
                        passenger[key] = req.body[key];
                }
                passenger.save(function(err){
                    if(err){
                        res.status(500).send({
                            "errorCode" : 1005,
                            "errorMsg" : 'Invalid value in passenger',
                            "statusCode" : 500,
                            "statusTxt" : 'Mongoose Database Error'
                        });
                    }else{
                        res.json({"message" : "passenger Updated", "passenger_created" : passenger});
                    }
                });
            }
        });
    })
    .delete(function(req, res){
        passenger.remove({
            _id : req.params.passenger_id
        }, function(err, passenger){
            if(err){
                res.status(500).send({
                    "errorCode" : 1004,
                    "errorMsg" : 'Given passenger does not exist',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'                   
                });
            }else{
                res.json({"message" : "passenger Deleted"});
            }
        });
    });

module.exports = router;