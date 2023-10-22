import passwordsFeature from "@adminjs/passwords";
import bcrypt from 'bcrypt';
import { AdminModel } from "./admin.schema.js";
import { componentLoader } from "./components.js";

const encryptPassword = async (password: string) => {
  const passwordHashed = await bcrypt.hash(password, 10);
  return passwordHashed;
};

export const AdminResource = {
  resource: AdminModel,
  options: {
    navigation: {
      icon: "User",
    },
    properties: { hashedPassword: { isVisible: false } },
  },
  features: [
    passwordsFeature({
      properties: {
        encryptedPassword: "hashedPassword",
        password: "password",
      },
      hash: encryptPassword,
      componentLoader: componentLoader,
    }),
  ],
};
