const express = require('express');
const PORT = 2721;
const mysql = require('mysql2')
const app = express();

app.use(express.json());

//Here i connected my API to mySql and a database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ngwudalu12345.',
  database: 'taskManager'
})
connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected succefully')
  }
})



app.listen(PORT, () => {
  console.log('SERVER IS RUNNING')
})

//I have Already Defined this the Database 
// var todo = [
//   {
//     id: "1",
//     task: "Code today",
//     completed: true,
//   }
// ]

// GET
app.get('/GET/todos/:id', (req, res) => {
  const fetchid = req.params.id;
  connection.query('SELECT * FROM tasks WHERE id = ?',fetchid,(err, result) =>{
if(err){
  console.log(err)
}else{
  res.status(201).send(
   result
  )
} } )
})

//POST 
app.post('/POST/todos', (req, res) => {
  const { task, completed } = req.body;
  connection.query(
    'INSERT INTO tasks (task, completed) VALUES (?, ?)',
    [task, completed],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Failed to insert task" });
      } else {
        res.status(201).send("POSTED SUCESSFULLY");
      }
    }
  );})


//DELETE
app.delete('/DELETE/todos/:id', (req, res) => {
  var id = req.params.id
  connection.query('DELETE FROM tasks WhERE id=?',id,(err, result)=>{
    if(err){
      console.log(err);
    }else{
      res.status(201).send("DELETED SUCESSFULLY")
    }
  })
})


//PUT
app.put('/PUT/todos/:id', (req, res) => {
  var id = req.params.id;
  const { task, completed } = req.body;
  connection.query('UPDATE tasks SET task =?, completed=? WHERE id=?',[task,completed,id],(err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.status(201).send("UPDATED SUCESSFULLY")
    }
  })
})



///DONE✔️✔️