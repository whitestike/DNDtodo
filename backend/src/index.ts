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
  
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

console.log(process.env.SECRET_CODE);