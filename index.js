import express from "express";
import session from "express-session";
import mongoose from "mongoose";

const app = express();

const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster.cbwnbgc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri).then(
	(client) => {console.log("connected")}, // success
	(reason) => {console.log(`failed: ${reason}`)} // fail :(
);

// app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");
// app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.render("index", {item_list: ["hey", "soul", "sister"]});
});

app.post("/add", (req, res) => {
	console.log(`Adding ToDo "${req.body.content}"`);
	res.render("components/item", {content: req.body.content, render: true})
})

app.listen(3000);


