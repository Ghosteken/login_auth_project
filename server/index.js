require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
connection();

// Middlewares
app.use(express.json());
app.use(helmet());


const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // limit each IP to 50 requests per windowMs
});

app.use(limiter);


// Routes
app.get("/", (req, res) => {
    res.send("This is the backend!!");
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error-Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(morgan('combined')); //logs req in combined format


const ip = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 8080;

app.listen(port, ip, () => {
    console.log(`Listening on http://${ip}:${port}...`);
});
