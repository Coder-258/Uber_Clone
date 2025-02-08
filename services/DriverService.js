const DriverModel = require('../models/DriverModel');

module.exports.createDriver = async ({
    fullName, email, password, vehicle
}) => {
    if (!fullName || !email || !password || !vehicle) {
        throw new Error('All required fields must be provided');
    }
    
    const { firstName, lastName } = fullName;
    const { color, plate, capacity, vehicleType } = vehicle;

    if (!firstName || !lastName || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All required fields must be provided');
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
    });
    return driver;
};