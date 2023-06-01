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
  const todos = await prisma.todo.findMany();
  res.json(todos);
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