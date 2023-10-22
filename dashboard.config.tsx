import { AdminJSOptions } from "adminjs";
import { Components } from "./components.js";
import { MovieModel } from "./movie.schema.js";

const dashboardHandler = async () => {
  const moviesCount = await MovieModel.countDocuments();
  return { moviesCount };
};

export const DashboardOptions: AdminJSOptions["dashboard"] = {
  component: Components.Dashboard,
  handler: dashboardHandler,
};
