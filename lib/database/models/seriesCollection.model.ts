import { model, models, Schema, Document } from "mongoose";


export interface SeriesInterface extends Document {
  //_id: string;
  tmdbId: string;
  imageUrl: string;
  title: string;
  rating: string;
  isWatching: boolean;
  isWatched: boolean;
  isWishlisted: boolean;
  isFavorited: boolean;
  isOwned: boolean;
  categories: string[];
  progress: number;
  seasons: number;
  comments: string;
  cost: number;
  currency: string;
  format: string;
  //createdAt: Date;
  //updatedAt: Date;
}

export const SeriesSchema = new Schema({
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

export interface SeriesCollectionInterface extends Document {
  _id: string;
  clerkId: string;
  series: SeriesInterface[];
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


const SeriesCollectionSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  series: [{
    type: SeriesSchema,
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})


const SeriesCollection = models?.SeriesCollection || model("SeriesCollection", SeriesCollectionSchema);

export default SeriesCollection;