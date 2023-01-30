import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

describe('BooksService', () => {
  let booksService: BooksService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await booksService.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a book', async () => {
      const save = jest.spyOn(bookRepository, 'save').mockImplementation(() => Promise.resolve({} as any));
      const result = booksService.create({ title: 'Test Book', author: 'John Doe' });
      expect(save).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const findOne = jest.spyOn(bookRepository, 'findOne').mockImplementation(() => Promise.resolve({} as any));
      const result = booksService.findOne(1);
      expect(findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual({});
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const save = jest.spyOn(bookRepository, 'save').mockImplementation(() => Promise.resolve({} as any));
      const result = booksService.update(1, { title: 'New Title' });
      expect(save).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  // describe('delete', () => {
  //   it('should delete a book', async () => {
  //     const delete = jest.spyOn(bookRepository, 'delete').mockImplementation(() => Promise.resolve());
  //     booksService.delete(1);
  //     expect(delete).toHaveBeenCalledWith(1);
  //   });
  // });
});
