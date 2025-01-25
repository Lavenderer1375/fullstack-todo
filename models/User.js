import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  lastName: String,
  todos: [
    {
      title: String,
      details: String,
      status: String,
    },
  ],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = mongoose.models.User || model("User", userSchema);

export default User;
