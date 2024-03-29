import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user';
import adminRoutes from './routes/admin';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
require('./setup/mongoose')
require('./setup/passport')

app.use('/api', userRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
