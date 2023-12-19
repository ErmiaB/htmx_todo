import express from "express";
import session from "express-session";
import mongoose from "mongoose";

const app = express();

// app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");
// app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Servern igång");
  });

app.listen(3000, () => {
  console.log("server is running");
});


