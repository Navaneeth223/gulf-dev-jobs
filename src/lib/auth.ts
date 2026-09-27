import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { isUserRole } from "@/types/roles";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (!email || !password) {
          return null;
        }

        await connectDB();
        const dbUser = await User.findOne({ email });
        if (!dbUser?.passwordHash) {
          return null;
        }

        const valid = await compare(password, dbUser.passwordHash);
        if (!valid) {
          return null;
        }

        return {
          id: dbUser._id.toString(),
          email: dbUser.email,
          name: dbUser.name,
          image: dbUser.image,
          role: dbUser.role ?? null,
        };
      },
    }),
    ...(googleClientId && googleClientSecret
      ? [
          GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) {
        return true;
      }

      await connectDB();
      const email = user.email.toLowerCase();
      const existing = await User.findOne({ email });
      if (!existing) {
        await User.create({
          email,
          name: user.name ?? email.split("@")[0],
          image: user.image,
        });
      }

      return true;
    },
    async jwt({ token, user, trigger }) {
      const email = user?.email ?? token.email;
      if ((user || trigger === "update") && email) {
        await connectDB();
        const dbUser = await User.findOne({ email: email.toLowerCase() });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = isUserRole(dbUser.role) ? dbUser.role : null;
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.picture = dbUser.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role ?? null;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};

export function isGoogleAuthEnabled(): boolean {
  return Boolean(googleClientId && googleClientSecret);
}
