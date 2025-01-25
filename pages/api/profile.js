import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import { verifyPassword } from "@/utils/auth";

const handler = async (req, res) => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error.message);
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
    const { name, lastName, password } = req.body;

    if (!name || !lastName) {
      return res.status(402).json({
        status: "Failed",
        message: "Please enter name and/or password",
      });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res
        .status(402)
        .json({ status: "Failed", message: "Password is not valid!" });
    }

    user.name = name;
    user.lastName = lastName;
    await user.save();

    return res.status(201).json({
      status: "Success",
      message: "Profile data completed!",
      data: { name, lastName, email: token.email },
    });
  } else if (req.method === "GET") {
    return res
      .status(200)
      .json({
        status: "Success",
        data: { name: user.name, lastName: user.lastName, email: user.email },
      });
  }
};

export default handler;
