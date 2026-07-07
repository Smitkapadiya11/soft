import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        if (!process.env.NEXTAUTH_SECRET) {
          console.error("[auth] NEXTAUTH_SECRET is not set");
          return null;
        }

        try {
          const admin = await prisma.admin.findUnique({
            where: { username: credentials.username.trim() },
          });
          if (!admin) return null;

          const valid = await bcrypt.compare(credentials.password, admin.passwordHash);
          if (!valid) return null;

          return { id: admin.id, name: admin.username };
        } catch (err) {
          console.error("[auth] Database error during login:", err);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  pages: { signIn: "/admin/login" },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: { id: string } }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};
