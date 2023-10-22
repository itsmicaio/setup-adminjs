import { ResourceWithOptions } from "adminjs";
import { MovieModel } from "./movie.schema.js";

export const MovieResource: ResourceWithOptions = {
  resource: MovieModel,
  options: {
    navigation: {
      icon: "Film",
    },
    properties: {
      synopsis: { type: "richtext" },
    },
  },
};
