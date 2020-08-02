import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log('✅Connted to DB');
const handleError = (error) => console.log(`❌Connecion ${error}`);

db.on('error', handleError);
db.once('open', handleOpen);