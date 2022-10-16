import express from 'express';
import {PORT} from './config.js';

import indexRoutes from './routes/index.routes.js';
import tasksRoutes from "./routes/tasks.routes.js";


//Inicializamos express
const app = express();

//Permite procesar los datos que vengan del cliente y si es un un objeto json lo podra recibir
app.use(express.json())

//Iniciamos las rutas
app.use(indexRoutes)

//Iniciamos las rutas de Task
app.use(tasksRoutes)


app.listen(PORT)
console.log('Server is running on port ' + PORT)
