require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.config");

const authorRouter = require("./router/auth.routes");
const bookRouter = require("./router/book.routes");
const quoteRouter = require("./router/quote.routes");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB();
app.use("/api/auth", authorRouter);
app.use("/api/books", bookRouter);
app.use("/api/quotes", quoteRouter); 
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Server is running at: " + PORT);
});