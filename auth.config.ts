import MongoStore from "connect-mongo";
import { AdminModel } from "./admin.schema.js";
import bcrypt from "bcrypt";

const authenticate = async (email: string, password: string) => {
  const admin = await AdminModel.findOne({ email });
  if (!admin) return null;
  const isValidPassword = await bcrypt.compare(password, admin.hashedPassword);
  if (!isValidPassword) return null;
  return admin;
};

export const AuthOptions = {
  auth: {
    authenticate: authenticate,
    cookieName: "adminjs",
    cookiePassword: "sessionsecret",
  },
  session: (sessionStore: MongoStore) => ({
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: "sessionsecret",
    cookie: {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    },
    name: "adminjs",
  }),
};
