import express from 'express';
import { establishConnection } from './src/config/dBConfig.js';
import adminRouter from './src/router/adminRouter.js';
import eventRouter from './src/router/eventRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();

app.use(cors());

const PORT = 9600;
app.use(express.json());

// const path = express()

app.use("/admin", adminRouter);

app.use("/events", eventRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory))

app.get("/", (request, response) =>{
    // console.log(request.url);
    
    response.render("index");
})

app.get("/events", (request, response) =>{
    response.render("ticketBooking");
})

app.get("/sign-in", (request, response) =>{
    response.render("signin");
})

app.get("/save-events", (request, response) =>{
    response.render("register-event")
})

app.get("/sign-up", (request, response) =>{
    response.render("signup");
})



app.set('view engine', 'hbs');

app.listen(PORT, (error) =>{
    console.log(`Server is connected to ${PORT}`)
    establishConnection();
})