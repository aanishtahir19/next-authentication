import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserModel from '../../../Models/UserModel';
export default NextAuth({
  // Configure one or more authentication providers
  site: 'http://localhost:3000/',
  session: { strategy: 'jwt' },
  secret: 'i7meaCqbE8rOR158zzPl37mTzZCqeKn4uctlhcCIDdU=',
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // console.log(credentials);
        const user = await UserModel.findOne({
          email: credentials.email,
        });
        // const user = {
        //   email: 'aanishtahir19@gmail.com',
        //   password: '1234567890',
        // };
        // console.log({ email: user.email, role: user.role });
        if (user) {
          // Any object returned will be saved in `user` property of the JWT

          return { email: user.email, role: user.role };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
