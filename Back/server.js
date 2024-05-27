const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todos"
})


app.get('/', (req, res) => {
    const sql = 'SELECT * FROM ToDoLIst'
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
            return res.json(data)
    })
})

app.delete('/:id', (req, res) => {
    const id = req.params.id
    db.query('DELETE FROM `ToDoLIst` WHERE id = ?', [id], (err, data) => {
        if (err) return res.json(err)
            return res.json(data)
    })
})

app.post('/', (req, res) => {
    let data = [req.body.id, req.body.task, req.body.isDone]
    db.query("INSERT INTO `ToDoLIst`(`id`, `task`, `isDone`) VALUES (?,?,?)", data, (err,data) => {
        if (err) return res.json(err)
            return res.json(data)
    })
})

app.put('/:id/:isDone', (req, res) => {
    const id = req.params.id
    const isDone = req.params.isDone
    db.query('UPDATE `ToDoLIst` SET `isDone`= ? WHERE id = ?', [isDone, id], (err, data) => {
        if (err) return res.json(err)
            return res.json(data)
    })
})

app.listen(8080, () => {
    console.log('Cервер запущен')
})

