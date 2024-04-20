import { model, models, Schema, Document } from "mongoose";



export interface MovieInterface extends Document {
  _id: string;
  tmdbId: string;
  title: string;
  rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | undefined;
  imageUrl: String;
  categories: string[];
  comments: string;
  flags: {
    "watched": boolean;
    "own": boolean;
    "watching": boolean;
    "plan to watch": boolean;
    "plan to buy": boolean;
  }
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieCollectionInterface extends Document {
  _id: string;
  clerkId: string;
  movies: MovieInterface[];
  createdAt: Date;
  updatedAt: Date;
}


const MovieSchema = new Schema({
  tmdbId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: undefined,
  },
  imageUrl: {
    type: String,
  },
  categories: [{
    type: String,
  }],
  comments: {
    type: String,
  },
  flags: {
    type: {
      "watched": Boolean,
      "own": Boolean,
      "watching": Boolean,
      "plan to watch": Boolean,
      "plan to buy": Boolean,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const MovieCollectionSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  movies: [{
    type: MovieSchema,
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})


const MovieCollection = models?.MovieCollection || model("MovieCollection", MovieCollectionSchema);

export default MovieCollection;