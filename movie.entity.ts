export interface Actor {
  name: string;
  surname: string;
}

export interface Movie {
  title: string;
  synopsis: string;
  date: Date;
  price: number;
  categories: string[];
  actors: Actor[];
}