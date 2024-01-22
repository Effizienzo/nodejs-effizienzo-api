const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();

const allowedOrigins = ['https://effizienzo.vercel.app', 'http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

// Zusätzliche CORS-Konfiguration für Header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Hier kannst du die erlaubten Ursprünge spezifizieren oder "*" verwenden, um alle zuzulassen
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const usersRouter = require('./routes/users.router');
const authRouter = require('./routes/auth.router');

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running....");
});
