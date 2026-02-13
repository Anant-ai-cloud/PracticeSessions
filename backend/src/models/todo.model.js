import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        maxlength: 500
    },
    dueDate: {
        type: Date,
    },

    category: {
        type: String,
        enum: ["urgent", "non-urgent"],
        default: "non-urgent",
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

todoSchema.index({ dueDate: 1 })

const Todo = mongoose.model("Todo", todoSchema)
export default Todo;