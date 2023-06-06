import cors from 'cors';
import * as dotenv from "dotenv";
dotenv.config();

import prisma from "../lib/primsa";

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Application = express();
app.use(cors({ origin: true }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Healthy");
}); 

// Get all users
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Get login a user with email and password
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
  });

  if(user != null && user.password == password){
    res.send(user);
  }

  res.status(401).end();
});
  
// Post create a user
app.post("/user", async (req, res) => {
  const user = req.body.user;

  const createdUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
  });

  if(createdUser != null){
    res.send(user);
  }

  res.status(401).end();
});

// Get all todos
app.get("/todos", async (req, res) => { 
  if(req.query.id != undefined)
  {
    const userId: number = +req.query.id;
    const todos = await prisma.todo.findMany({
      where: {
        user_id: userId
      }
    });
    res.json(todos);
  }else{
    res.status(400).end();
  }
})

app.post("/todo", async (req, res) => {
  const todo = req.body.todo;

  const createdUser = await prisma.todo.create({
    data: {
      description: todo.description,
      user_id: todo.userId,
      room: todo.room,
      done: todo.done
    },
  });

  if(createdUser != null){
    res.send(todo);
  }

  res.status(401).end();
})

// Update a todo
app.put("/todo", async (req, res) => {
  const todo = req.body.todo;
  const updatedTodo = await prisma.todo.update({
    data: todo,
    where: {
      id: todo.id
    }
  });

  res.status(201).end();
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

console.log(process.env.SECRET_CODE);