var UserModel = require('../models/user');
var DeviceModel = require('../models/device');
var config = require('../config');
var client = require('./mqttClient');

//U-ApiKey
var isAuthenticated = function (req, res, next) {
    var userkey = req.get('U-ApiKey');
    UserModel.findOne({ ukey: userkey }, function (err, u) {
        if (u !== null) {
            req.ukey = userkey;
            next();
        } else {
            res.status(412);
            res.end();
        }
    });
};
var getAllDevices = function (req, res) {
    DeviceModel.find({}, function (err, devices) {
        res.json(devices);
    });
};

var updateDevice = function (req, res) {
    var value, mqttValue;
    if(req.body.type === 'switch') {
        value = req.param('value');
        mqttValue = '{"switch":' + Number(req.param('value')) + '}';
    } else if(req.body.type === 'step') {
        var reqSwitch = Number(req.body.switch);
        var controller = Number(req.body.controller);
        //value = JSON.stringify({"switch": reqSwitch, "controller": controller});
        value = '{"switch":' + reqSwitch+',"controller":' +controller+ '}';
        mqttValue = value;
    } else {
        res.send('post type error!');
        res.end();
        return console.error('DeviceRouter Post Type Error! ');
    }
    DeviceModel.findOneAndUpdate({id: req.params.id}, {$set: {value: value}}, function (err, dv) {
        if(err) {
            if(!config.production) {
                res.send(err);
            } else {
                res.status(404);
                res.end();
                if(config.mqttServer) {
                    client.publish('d'+req.params.id, mqttValue);
                }
            }
        } else {
            res.send('post success!');
            res.end();
            if(config.mqttServer) {
                client.publish('d'+req.params.id, mqttValue);
            }
        }
    });
};
var getDevice = function (req, res) {
    DeviceModel.findOne({ id: req.params.id}, function (err, dv) {
        if(err) {
            if (!config.production) {
                res.send(err);
            } else {
                res.status(404);
                res.end();
            }
        } else {
            if(dv !== null) {
                var obj = dv.toObject();
                delete obj._id;
                delete obj.__v;
                res.json(obj);
            } else {
                res.end();
            }
        }
    })
};
var getDeviceValue = function (req, res) {
    DeviceModel.findOne({id: req.params.id}, function (err, dv) {
        if(err) {
            if (!config.production) {
                res.send(err);
            } else {
                res.status(404);
                res.end();
            }
        } else {
            if(dv !== null) {
                var obj = dv.toObject();
                if('step' ===  obj.type) {
                    res.send(obj.value);
                } else {
                    res.send('{"switch":' + obj.value + '}');
                }
            } else {
                res.end();
            }
        }
    })
};

module.exports = {
    isAuthenticated: isAuthenticated,
    getAllDevices: getAllDevices,
    updateDevice: updateDevice,
    getDevice: getDevice,
    getDeviceValue: getDeviceValue
};