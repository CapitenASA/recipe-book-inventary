import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './entities/book.entity';

interface Params {
  sort?: string;
  limit?: string;
}

@Injectable()
export class BooksService {
  delete(arg0: number) {
    throw new Error('Method not implemented.');
  }
  update(arg0: number, arg1: { title: string; }) {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  create(arg0: { title: string; author: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}
  //   findAll(params: Array<string>): any {
  //     if (params.length > 0) {
  //       return `findAll working with ${params}`;
  //     } else {
  //       return 'findAll working';
  //     }
  //   }
  findAll(params?: Params): Promise<Book[]> {
    // let sort: string, limit: string;
    // if (params !== undefined) ({ sort, limit } = params);
    // let msg = 'findAll working';
    // if (sort) msg = msg.concat(` with ${sort}`);
    // if (limit) msg = msg.concat(` with ${limit}`);

    // return msg;
    return this.bookRepository.find();
  }

  findBook(bookId: string): Promise<Book> {
    // return `findBook working with bookId:${bookId}`;
    return this.bookRepository.findOne({ where: { id: parseInt(bookId) } });
  }

  createBook(newBook: CreateBookDto): Promise<Book> {
    // return newBook;
    return this.bookRepository.save(newBook);
  }

  deleteBook(bookId: string) {
    // return `deleted with bookId: ${bookId}`;
    return this.bookRepository.delete({ id: parseInt(bookId) });
  }

  async updateBook(bookId: string, newBook: UpdateBookDto) {
    try {
      const book = await this.findBook(bookId);
      if (book != null) {
        const updateBook = Object.assign(book, newBook);
        return this.bookRepository.save(updateBook);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
    // return `updated book: ${bookId} with ${JSON.stringify(newBook)}`;
  }
}
