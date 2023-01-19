// const client = require('./connection.js')
const { Client } = require('pg')

const client = new Client({
    host: "sanjay.cqlap8amzsmz.ap-northeast-1.rds.amazonaws.com",
    user: "tillde",
    port: 5432,
    password: "xerneas12",
    database: "sanjdb"
})
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 3300, () => {
    console.log("Server is now listening at post 3300");
})

client.connect(function (err) {
    if (err) throw err;
});

app.get("/", (req, res) => res.json('My API is running'))

//GET
app.get("/users", (req, res) => {
    client.query(`Select * from "WalletInfo"`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    })
    client.end;
})

app.get('/user/:id', function (req, res) {
    res.send('user' + req.params.id);
});

//GET by id
app.get("/users/:id", (req, res) => {
    client.query(`Select * from employ where id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

//POST
app.post('/users', (req, res) => {
    const user = req.body;
    let insertQuery = `insert into employ(id, email, first_name, last_name) 
                       values(${user.id}, '${user.email}', '${user.first_name}', '${user.last_name}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})


//PUT
app.put('/users/:id', (req, res) => {
    let user = req.body;
    let updateQuery = `update employ
                       set email = '${user.email}',
                       first_name = '${user.first_name}',
                       last_name = '${user.last_name}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

//DELETE
app.delete('/users/:id', (req, res) => {
    let insertQuery = `delete from employ where id=${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})