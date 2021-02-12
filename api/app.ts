import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { connectToDb } from './src/db';
import invitationRoutes from './src/routes/invitation';
import projectRoutes from './src/routes/projects';
import userRoutes from './src/routes/user';
import taskRoutes from './src/routes/tasks';

const app = express();
const PORT = 8080;
const DATABASE_URI = 'mongodb://localhost:27017/project-butler';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDb(DATABASE_URI);
app.use(invitationRoutes);
app.use(projectRoutes);
app.use(userRoutes);
app.use(taskRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
