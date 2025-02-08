const DriverModel = require('../models/DriverModel');

module.exports.createDriver = async ({
    firstName, lastName, email, password, color, plate, capacity, vehicleType, latitude, longitude
}) => {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const driver = await DriverModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        },
        location: {
            latitude,
            longitude
        }
    });
    return driver;
};