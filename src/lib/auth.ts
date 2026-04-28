import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        // Hardcoded admin / user (env-based fallback)
        if (
          credentials.username === "admin" &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin", name: "Admin", email: "admin@zengo.app", role: "admin" };
        }
        if (
          credentials.username === "user" &&
          credentials.password === process.env.USER_PASSWORD
        ) {
          return { id: "user", name: "User", email: "user@zengo.app", role: "user" };
        }

        // Supabase users table
        const { data: user } = await supabase
          .from("users")
          .select("id, username, email, password_hash, role")
          .eq("username", credentials.username)
          .maybeSingle();

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password_hash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id; // store so session can expose it
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id ?? token.sub; // sub is set by NextAuth from user.id
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
};
