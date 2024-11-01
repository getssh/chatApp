import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log('Connected to MDB')
  } catch (error) {
    console.log("Error on connecting to MDB", error.message)
  }
}

export default connectMongoDB;