import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: "Failed", message: "Connection to DB failed!" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ status: "Failed", message: "Email and Password are required!" });
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(422)
      .json({ status: "Failed", message: "User already exists!" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email: email, password: hashedPassword });
  console.log(newUser);

  return res
    .status(200)
    .json({ status: "Success", message: "User created!", data: newUser });
}
