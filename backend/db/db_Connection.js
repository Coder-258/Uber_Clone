const mongoose = require('mongoose');

const connect_to_db = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Connected to DB");
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
};

module.exports = connect_to_db;
