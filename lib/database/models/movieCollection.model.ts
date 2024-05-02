import { model, models, Schema, Document } from "mongoose";



/* export interface MovieInterface extends Document {
  //_id: string;
  tmdbId: string;
  title: string;
  rating: number;
  imageUrl: string;
  categories: string[];
  comments: string;
  flags: {
    "watched": boolean;
    "own": boolean;
    "watching": boolean;
    "plan to watch": boolean;
    "plan to buy": boolean;
  }
  //createdAt: Date;
  //updatedAt: Date;
} */

export interface MovieInterface extends Document {
  //_id: string;
  tmdbId: string;
  imageUrl: string,
  title: string,
  rating: string,
  isWatching: boolean,
  isWatched: boolean,
  isWishlisted: boolean,
  isFavorited: boolean,
  isOwned: boolean,
  categories: string[];
  comments: string;
  cost: number;
  currency: string;
  format: string;
  //createdAt: Date;
  //updatedAt: Date;
}

export const MovieSchema = new Schema({
  tmdbId: {
    type: String,
    required: true,
    //unique: true,
  },
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
    //required: true,
  },
  rating: {
    type: Number,
    default: undefined,
  },
  isWatching: {
    type: Boolean
  },
  isWatched: {
    type: Boolean
  },
  isWishlisted: {
    type: Boolean
  },
  isFavorited: {
    type: Boolean
  },
  isOwned: {
    type: Boolean
  },
  categories: [{
    type: String,
  }],
  comments: {
    type: String,
  },
  cost: {
    type: Number,
  },
  currency: {
    type: String,
  },
  format: {
    type: String,
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

export interface MovieCollectionInterface extends Document {
  _id: string;
  clerkId: string;
  movies: MovieInterface[];
  createdAt: Date;
  updatedAt: Date;
}


/* export const MovieSchema = new Schema({
  tmdbId: {
    type: String,
    //required: true,
    //unique: true,
  },
  title: {
    type: String,
    //required: true,
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
}); */


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