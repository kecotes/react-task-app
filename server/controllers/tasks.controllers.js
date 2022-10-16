import {pool} from "../db.js";

export const getTasks = async (req, res) => {
    try {
        throw new Error("fff");
        const [result] = await pool.query('SELECT * FROM tasks ORDER BY createAt ASC');
        console.log('result => ',result);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getTask = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);

        if(result.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        //Queremos devolver solamente el objeto con el id buscado por esto, ponemos la posición 0. De lo contrario mostraria un array de objetos que solo tendria 1 objeto
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const createTasks = async (req, res) => {
    try {
        const { title, description } = req.body;
        const [result] = await pool.query('INSERT INTO tasks(title, description) VALUES (? , ?)', [
            title,
            description
        ]);
        console.log('[result] =>',result);
        /* Con send envio un texto
        res.send('Creando tarea'); */
        res.json({
            id: result.insertId,
            title,
            description,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const updateTasks = async (req, res) => {
    try {
        const {title, description } = req.body;

        // El SET lo que dice es, estoy recibiendo un objeto, por eso ponemos simplemente req.body. Y podemos poner title description y todo en el update
        const [result] = await pool.query('UPDATE tasks SET ? WHERE id = ?', [
            req.body,
            req.params.id
        ]);

        return res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const deleteTasks = async (req, res) => {
    try{
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);

        if(result.affectedRows === 0)
            return res.status(404).json({ message: "Task not found"});

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
