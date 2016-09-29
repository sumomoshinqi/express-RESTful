/** 
 * Express Route: /drivers
 * @author Clark Jeria
 * @version 0.0.2
 */
var express = require('express');
var router = express.Router();

var Driver = require('../app/models/driver');

var propList = ['name', 'firstName', 'lastName', 'emailAddress', 'password', 'addressLine1', 'addressLine2', 'city', 'state', 'zip', 'phoneNumber'];

router.route('/drivers') 
    .get(function(req, res){
        driver.find(function(err, drivers){
            if(err){
                res.status(500).send({
                    "errorCode" : 1008,
                    "errorMsg" : 'No driver data',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                res.json(drivers);
            }
        });
    })
    .post(function(req, res){
        var driver = new Driver();
        
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
                driver[key] = req.body[key];
        }

        driver.save(function(err){
            if(err){
                res.status(500).send({
                    "errorCode" : 1005,
                    "errorMsg" : 'Invalid value in driver',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                res.status(201).json({"message" : "driver Created", "driver_created" : driver});
            }
        });
    });

router.route('/drivers/:driver_id')
    .get(function(req, res){
        driver.findById(req.params.driver_id, function(err, driver){
            if(err){
                res.status(500).send({
                    "errorCode" : 1003,
                    "errorMsg" : 'Given driver does not exist',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'
                });
            }else{
                res.json(driver);
            }
        });  
    })
    .patch(function(req, res){
        driver.findById(req.params.driver_id, function(err, driver){
            if(err){
                res.status(500).send({
                    "errorCode" : 1003,
                    "errorMsg" : 'Given driver does not exist',
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
                        driver[key] = req.body[key];
                }
                driver.save(function(err){
                    if(err){
                        res.status(500).send({
                            "errorCode" : 1005,
                            "errorMsg" : 'Invalid value in driver',
                            "statusCode" : 500,
                            "statusTxt" : 'Mongoose Database Error'
                        });
                    }else{
                        res.json({"message" : "driver Updated", "driver_created" : driver});
                    }
                });
            }
        });
    })
    .delete(function(req, res){
        driver.remove({
            _id : req.params.driver_id
        }, function(err, driver){
            if(err){
                res.status(500).send({
                    "errorCode" : 1003,
                    "errorMsg" : 'Given driver does not exist',
                    "statusCode" : 500,
                    "statusTxt" : 'Mongoose Database Error'                   
                });
            }else{
                res.json({"message" : "driver Deleted"});
            }
        });
    });

module.exports = router;