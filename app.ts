import AdminJS, { AdminJSOptions } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import mongoose from "mongoose";
import * as AdminJSMongoose from "@adminjs/mongoose";
import "dotenv/config";
import { MovieResource } from "./movie.resource.js";
import { AdminResource } from "./admin.resource.js";
import { componentLoader } from "./components.js";
import { DashboardOptions } from "./dashboard.config.js";
import { AuthOptions } from "./auth.config.js";
import MongoStore from "connect-mongo";

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const PORT = 3000;

const start = async () => {
  const app = express();
  await mongoose.connect(process.env.MONGO_DB_URL || "");
  const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    collectionName: "sessions",
    stringify: false,
    autoRemove: "interval",
    autoRemoveInterval: 1,
  });
  const adminOptions: AdminJSOptions = {
    resources: [MovieResource, AdminResource],
    dashboard: DashboardOptions,
    componentLoader,
  };
  const admin = new AdminJS(adminOptions);
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    AuthOptions.auth,
    null,
    AuthOptions.session(sessionStore)
  );
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
