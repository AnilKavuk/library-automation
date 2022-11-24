import { Book } from "src/app/models/book";

export interface BookStoreState{
  bookModel: Book | null;
}

export const initialBookStoreState: BookStoreState = {
  bookModel:null
}
