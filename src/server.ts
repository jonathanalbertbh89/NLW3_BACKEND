import express from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';

import routes from './routes/routes';
import errorHandler from './errors/handler';
import './connection/connection';


const app = express();
app.use(cors());
app.use(express.json());


app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'upload')) )
app.use(errorHandler)
app.listen(3333);
