import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Uppgiften får ej vara tom."],
    },
    done: {
        type: Boolean,
        required: [true, "Uppgiften måste anges."],
        default: false,
    },
});


const ToDoItem = mongoose.model("ToDoItem", toDoSchema);
export default ToDoItem;