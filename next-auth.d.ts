import { DefaultSession } from "next-auth"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      token?: string | null // 👈 Tells TS that session.user.token exists
    } & DefaultSession["user"]
  }

  /**
   * The shape of the user object returned in the OAuth profile callback or authorize function
   */
  interface User {
    token?: string | null // 👈 Tells TS that your authorize function can return a token
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id?: string
    accessToken?: string | null // 👈 Tells TS that token.accessToken exists inside the jwt callback
  }
}
