import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email dan password wajib diisi");
          }

          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Login gagal");
          }

          // Sesuaikan dengan struktur response Laravel Anda yang benar
          if (
            data &&
            data.success &&
            data.data &&
            data.data.user &&
            data.data.access_token
          ) {
            return {
              id: data.data.user.id.toString(),
              email: data.data.user.email,
              name: data.data.user.name,
              accessToken: data.data.access_token,
              tokenType: data.data.token_type,
              expiresIn: data.data.expires_in,
            };
          }

          throw new Error("Format response tidak valid");
        } catch (error) {
          throw new Error(error.message || "Terjadi kesalahan saat login");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.tokenType = user.tokenType;
        token.expiresIn = user.expiresIn;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.tokenType = token.tokenType;
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
