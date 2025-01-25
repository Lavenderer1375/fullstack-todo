import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;

          try {

            await connectDB();

          } catch (error) {

            throw new Error(
              error,
              "An error occurred in connecting to database."
            );
            
          }

          if (!email || !password) {
            throw new Error("Please enter email and password.");
          }

          const user = await User.findOne({ email: email });

          if (!user) throw new Error("No user found with this email.");

          const isValid = await verifyPassword(password, user.password);

          if (!isValid) throw new Error("Invalid password.");

          return { email }; // Return the user object

        } catch (error) {

          console.log(error.message);

          throw new Error(error.message);

        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
