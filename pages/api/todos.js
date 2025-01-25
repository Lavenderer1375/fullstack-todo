import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getToken } from "next-auth/jwt";
import { sortTodos } from "@/utils/sortTodos";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }

  const secret = process.env.NEXTAUTH_SECRET;

  const token = await getToken({ req, secret });

  if (!token) {
    return res
      .status(401)
      .json({ status: "Failed", message: "You Are Unauthorized!" });
  }

  const user = await User.findOne({ email: token.email });

  if (!user) {
    return res
      .status(401)
      .json({ status: "Failed", message: "User doesn't exist!" });
  }

  if (req.method === "POST") {
    const { title, status, details } = req.body;

    if (!title || !status) {
      return res.status(422).json({
        status: "Failed",
        message: "Title and Status are required!",
      });
    }

    user.todos.push({ title, details, status });
    await user.save();

    return res.status(200).json({
      status: "Success",
      message: "Todos created successfully!",
      data: { title, status, details },
    });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);

    return res
      .status(200)
      .json({ status: "Success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "Failed", message: "Invalid Data!" });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );

    console.log("result log:", result);

    return res
      .status(201)
      .json({ status: "Success", message: "Status Updated!" });
  }

  return res
    .status(405)
    .json({ status: "Failed", message: "Method Not Allowed" });
}

export default handler;
