import express from "express";
// import session from "express-session";
import mongoose from "mongoose";
import ToDoItem from "./models/ToDoItem.js";

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

app.get("/", async (req, res) => {
	//console.log(await ToDoItem.find());
	res.render("index", {item_list: await ToDoItem.find()});
});

app.post("/add", async (req, res) => {
	let item = await ToDoItem.create({
		content: req.body.content
	})
	res.render("components/item", {content: item, render: true});
});

app.delete("/remove/:id", async (req, res) => {
	let item = await ToDoItem.findOne({_id: req.params.id});
	if (item) {
		await ToDoItem.deleteOne({_id: req.params.id})
		res.send();
	} else {
		res.status(404);
		res.send("No such ToDo item found.")
	}
});

app.patch("/update/:id", async (req, res) => {
	let item = await ToDoItem.findOne({_id: req.params.id});
	if (item) {
		item.content = req.body.content;
		item.save();
		res.render("components/item", {content: item, render: true});
	} else {
		res.status(404);
		res.send("No such ToDo item found.")
	}
	
});

app.listen(3000);


