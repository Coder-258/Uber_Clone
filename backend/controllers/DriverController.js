const DriverModel = require('../models/DriverModel');
const DriverService = require('../services/DriverService');
const { validationResult } = require('express-validator');

module.exports.registerdriver = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password, vehicle, location } = req.body;
    const isdriverAlreadyExist = await DriverModel.findOne({ email });
    if (isdriverAlreadyExist) {
        return res.status(400).json({ message: 'driver already exist' });
    }
    const hashedPassword = await DriverModel.hashPassword(password);
    const driver = await DriverService.createDriver({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        latitude: location ? location.latitude : undefined,
        longitude: location ? location.longitude : undefined
    });
    const token = driver.generateAuthToken();
    res.status(201).json({ token, driver });
};