const express = require("express");
const cors = require("cors");
const connectDb = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const requestRoutes = require('./routes/request');
const userRoutes = require('./routes/user');

app.use('/', authRoutes);
app.use('/', profileRoutes);
app.use('/', requestRoutes);
app.use('/', userRoutes);

connectDb().then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
    })
}).catch((error) => {
    console.log("Database connection failed")
});
