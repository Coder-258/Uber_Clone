const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const DriverSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "color should be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "plate should be at least 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "capacity should be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike'],
        },
    },
    location: {
        latitude: {
            type: Number,
            required: false,
        },
        longitude: {
            type: Number,
            required: false,
        },
    }
});

DriverSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

DriverSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

DriverSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const driverModel = mongoose.model('driver', DriverSchema);
module.exports = driverModel;