import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Gokul Your MongoDB is Connected`);
    }catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      }
    };

export default ConnectDB;