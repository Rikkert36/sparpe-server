// eslint-disable import/first
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

import swaggerDocument from './public/swagger.json';

import { RegisterRoutes } from './routes';

// Import environment variables
dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.options('*', cors());

// Routes
RegisterRoutes(app);

// Use express for sessions
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, './public/swagger.json'));
});

// app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
