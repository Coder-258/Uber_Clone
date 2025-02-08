const DriverModel = require('../models/DriverModel');
const DriverService = require('../services/DriverService');
const { validationResult } = require('express-validator');
const blacklistToken = require('../models/blacklistToken');

module.exports.registerDriver = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password, vehicle } = req.body;
    const isDriverAlreadyExist = await DriverModel.findOne({ email });
    if (isDriverAlreadyExist) {
        return res.status(400).json({ message: 'Driver already exists' });
    }
    const hashedPassword = await DriverModel.hashPassword(password);
    const driver = await DriverService.createDriver({
        fullName,
        email,
        password: hashedPassword,
        vehicle
    });
    const token = driver.generateAuthToken();
    res.status(201).json({ token, driver });
};

module.exports.loginDriver = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const driver = await DriverModel.findOne({ email }).select("+password");
    if (!driver || !driver.password) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await driver.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = driver.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, driver });
};

module.exports.getDriverProfile = async (req, res, next) => {
    console.log("Driver profile:", req.driver);
    res.status(200).json(req.driver);
};

module.exports.logoutDriver = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: "Logged Out Successfully" });
};