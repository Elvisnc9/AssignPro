const express = require('express');
const PORT = 2721;

const app = express();

app.use(express.json());


app.listen(PORT, () => {
  console.log('SERVER IS RUNNING')
})

var todo = [
  {
    id: "1",
    task: "Code today",
    completed: true,
  }
]

// GET
app.get('/GET/todos', (req, res) => {
  res.send({
    message: "TO_DO APLICATION",
    data: todo
  })
})


//POST and A tiny bit of validations
app.post('/POST/todos', (req, res) => {
  const { task, completed } = req.body;
  if (task && typeof completed === 'boolean') {
    todo.push({
      id: (todo.length + 1).toString(),
      task: task,
      completed: completed
    })
    res.status(201).send(
      {
        message: "Task Added Successfully",
      })
  }
  else {
    res.status(400).send(
      {
        message: "NULL❌❌❌❌",
        error: "Task & completed requires a valid input"
      })
  }
});


//DELETE
app.delete('/DELETE/todos/:id', (req, res) => {
  var id = req.params.id
  const newtodo = todo.filter(tk => tk.id != id)
  todo = newtodo;

  res.send(
    {
      message: "Task has been deleted successfully",
      progress: "Done 💯💯"
    }
  )


})


//PUT
app.put('/PUT/todos/:id', (req, res) => {
  var id = req.params.id;
  const { task, completed } = req.body;
  var index = todo.findIndex(tk => tk.id == id);
  if (index === -1) {
    return res.status(404).send({ message: "Task not found" });
  }
  todo[index] = {
    ...todo[index],
    task,
    completed,
  }

  res.send(
    {
      message: "Task has been updated Succefully",
      progress: "Added ✔️✔️✔️"
    }
  )
})