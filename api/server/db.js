import {createPool} from 'mysql2/promise'

//Voy a instanciar el metodo Pool y voy a guardar ese nuevo objeto en una constante
export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'taskdb'
})

