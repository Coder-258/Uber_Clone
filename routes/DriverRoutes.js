const DriverController = require('../controllers/DriverController');
const express = require('express');
const router = express.Router();
const AuthMiddlewares = require('../middlewares/AuthMiddlewares');
const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike']).withMessage('Invalid vehicle type')
], DriverController.registerDriver);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], DriverController.loginDriver);

router.get('/profile', AuthMiddlewares.authDriver, DriverController.getDriverProfile);
router.get('/logout', AuthMiddlewares.authDriver, DriverController.logoutDriver);

module.exports = router;