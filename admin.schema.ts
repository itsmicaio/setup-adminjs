import { model, Schema } from "mongoose";
import { Admin } from "./admin.entity.js";

export const AdminSchema = new Schema<Admin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
  },
  { timestamps: true }
);

export const AdminModel = model<Admin>("Admin", AdminSchema);
