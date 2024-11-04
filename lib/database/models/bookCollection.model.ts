import { model, models, Schema, Document } from "mongoose";


export interface BookInterface extends Document {
  //_id: string;
  bookId: string;
  imageUrl: string;
  title: string;
  isbn: string;
  author: string;
  rating: string;
  isReading: boolean;
  isRead: boolean;
  isWishlisted: boolean;
  isFavorited: boolean;
  isOwned: boolean;
  timesRead: string;
  lastStartReadingDate: Date;
  lastEndReadingDate: Date;
  tags: string[];
  progress: number;
  volumes: number;
  comments: string;
  cost: number;
  currency: string;
  format: string;
  
  //createdAt: Date;
  //updatedAt: Date;
}

export const BookSchema = new Schema({
  bookId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  rating: {
    type: Number,
    default: undefined,
  },
  isReading: {
    type: Boolean
  },
  isRead: {
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
  tags: [{
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
  lastStartReadingDate: {
    type: Date,
  },
  lastEndReadingDate: {
    type: Date,
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

export interface BookCollectionInterface extends Document {
  _id: string;
  clerkId: string;
  books: BookInterface[];
  createdAt: Date;
  updatedAt: Date;
}



const BookCollectionSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  books: [{
    type: BookSchema,
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})


const BookCollection = models?.BookCollection || model("BookCollection", BookCollectionSchema);

export default BookCollection;