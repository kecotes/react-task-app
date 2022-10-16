import axios from 'axios'

export const getTasksRequets = async () => 
    await axios.get("http://localhost:4000/tasks");

export const createTaskRequest = async (task) => 
    // Envio el objeto Task a la ruta de la api
    await axios.post("http://localhost:4000/tasks", task);

export const deleteTaskRequest = async (id) =>
    await axios.delete(`http://localhost:4000/tasks/${id}`);

export const getOneTaskRequets = async (id) =>
    await axios.get(`http://localhost:4000/task/${id}`);

export const updateTaskRequest = async (id, newFields) => 
    await axios.put(`http://localhost:4000/tasks/${id}`, newFields);

export const toggleTaskDoneRequest = async (id, done) =>
    await axios.put(`http://localhost:4000/tasks/${id}`, {
        done,
    });