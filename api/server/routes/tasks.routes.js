import {Router} from "express";
import {
    getTask,
    getTasks,
    updateTasks,
    deleteTasks,
    createTasks
} from "../controllers/tasks.controllers.js";


const router = Router();


router.get('/tasks', getTasks)

//:id significa que es un parametro, un valor que es cambiante
router.get('/task/:id', getTask)

router.post('/tasks', createTasks)

router.put('/tasks/:id', updateTasks)

router.delete('/tasks/:id', deleteTasks)


export default router