import axios from 'axios'

export const createTaskRequest = async (task) => 
    // Envio el objeto Task a la ruta de la api
    await axios.post('http://localhost:4000/tasks', task)