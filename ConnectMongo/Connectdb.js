import mongoose from 'mongoose';

export default async function () {
  const db = await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log(`Connected to MongoDB: ${db.connection.host}`);
}
