import { Pipe, PipeTransform } from '@angular/core';

import { Book } from '../models/book';

@Pipe({
  name: 'bookFilterpipe',
})
export class BookFilterpipePipe implements PipeTransform {
  transform(value: Book[], key: string, name: string = ''): any {
    if (!name) return value;

    switch (key) {
      case 'publisher':
        return value.filter((book) =>
          book.publisher.toLocaleLowerCase().includes(name.toLowerCase())
        );
        break;

      case 'isbn':
        return value.filter((book) =>
          book.isbn.toString().includes(name.toLowerCase())
        );
        break;

      case 'bookName':
        return value.filter((book) =>
          book.name.toLocaleLowerCase().includes(name.toLowerCase())
        );
        break;

      case 'author':
        return value.filter((book) =>
          book.author.toLocaleLowerCase().includes(name.toLowerCase())
        );
        break;
    }
  }
}
