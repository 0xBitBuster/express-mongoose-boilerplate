const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connection was successful");
    } catch (error) {
        console.log(`There was an error while connecting to MongoDB: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDB;
