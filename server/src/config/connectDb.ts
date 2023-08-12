const mongoose = require("mongoose");

const connectDb = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDb;
