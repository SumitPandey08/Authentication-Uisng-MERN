import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = 'mongodb+srv://dbpass8871:dbpass8871@authserve.f13yu.mongodb.net/?retryWrites=true&w=majority&appName=AuthServe';
        if (!mongoURI) {
            throw new Error("MONGODB_URL is not defined in the environment variables");
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB Connected");
    } 
    catch (err) { 
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); 
    }
};

export default connectDB;
