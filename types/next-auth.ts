// https://next-auth.js.org/getting-started/typescript

import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    screen_name: string
  }

  interface Profile {
    screen_name?: string
  }
}