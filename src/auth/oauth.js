import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

console.log(process.env.GOOGLE_CLIENT_ID);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    // callbackURL: "http://localhost:3001/clients/googleRedirect",
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      console.log(profile);
    } catch (error) {}
  }
);

export default googleStrategy;
