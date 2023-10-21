import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import mongoose from "mongoose";
import * as AdminJSMongoose from "@adminjs/mongoose";
import 'dotenv/config';

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const PORT = 3000;

const start = async () => {
  const app = express();
  console.log(process.env.MONGO_DB_URL)
  await mongoose.connect(process.env.MONGO_DB_URL || "");
  
  
  const admin = new AdminJS({});

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();