import AdminJS, { AdminJSOptions } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import mongoose from "mongoose";
import * as AdminJSMongoose from "@adminjs/mongoose";
import "dotenv/config";
import { MovieResource } from "./movie.resource.js";
import { componentLoader } from "./components.js";
import { DashboardOptions } from "./dashboard.config.js";

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const PORT = 3000;

const start = async () => {
  const app = express();
  await mongoose.connect(process.env.MONGO_DB_URL || "");

  const adminOptions: AdminJSOptions = {
    resources: [MovieResource],
    dashboard: DashboardOptions,
    componentLoader,
  };
  const admin = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
