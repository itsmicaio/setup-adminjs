import { Schema, model } from "mongoose";
import { Actor, Movie } from "./movie.entity.js";

export const ActorSchema = new Schema<Actor>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
})

export const MovieSchema = new Schema<Movie>(
  {
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    categories: { type: [String], required: true },
    actors: { type: [ActorSchema], required: true },
  },
  { timestamps: true },
)

export const MovieModel = model<Movie>('Movie', MovieSchema);