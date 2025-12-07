// lib/auth.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Check if user is blocked
        if (user.isBlocked) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          isBlocked: user.isBlocked,
          profileCompleted: user.profileCompleted,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account", // 👈 forces account chooser
        },
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.role = user.role || "user";
        token.isBlocked = user.isBlocked || false;
        token.profileCompleted = user.profileCompleted || false;
      }

      // Handle token updates via session update
      if (trigger === "update" && session) {
        token.isBlocked = session.user.isBlocked ?? token.isBlocked;
        token.profileCompleted = session.user.profileCompleted ?? token.profileCompleted;
      }

      return token;
    },
    async session({ session, token }) {
      // console.log("🔐 session callback", { session, token });
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? "";
        session.user.image = token.picture ?? null;
        session.user.role = token.role ?? "user";
        session.user.isBlocked = token.isBlocked ?? false;
        session.user.profileCompleted = token.profileCompleted ?? false;
      }
      return session;
    },
    async signIn({ user, account }) {
      // Handle OAuth sign-ins (GitHub, Google)
      if (account?.provider !== "credentials") {
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        // Block admin OAuth sign-ins
        if (existingUser?.role === "admin") {
          return false;
        }

        // Block blocked users
        if (existingUser?.isBlocked) {
          return false;
        }

        // Create new user if doesn't exist
        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              role: "user",
              isBlocked: false,
              profileCompleted: false,
            },
          });
        }

        // Add user status to user object for JWT
        user.isBlocked = existingUser.isBlocked;
        user.profileCompleted = existingUser.profileCompleted;
        user.role = existingUser.role;
        user.id = existingUser.id;
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
