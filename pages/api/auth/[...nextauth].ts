import NextAuth from 'next-auth';
import TwitterProvider from "next-auth/providers/twitter";
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token } : { session: any, token: any }) {
      session.screen_name = token.screen_name;
      return session
    },
    async jwt({ token, account, profile }) {
      if (profile) {
        token.screen_name = profile.screen_name;
      }
      if (account) {
        token.oauth_token = account.oauth_token;
        token.oauth_token_secret = account.oauth_token_secret;
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/?redirect_from=twitter"
    },
  },
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY || "",
      clientSecret: process.env.TWITTER_API_SECRET || "",
      version: "1.0", // opt-in to Twitter OAuth 2.0
    })
  ]
}

export default NextAuth(authOptions);