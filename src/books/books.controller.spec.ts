import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await booksController.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a book', async () => {
      const create = jest.spyOn(booksService, 'create').mockImplementation(() => Promise.resolve({} as any));
      const result = booksController.create({ title: 'Test Book', author: 'John Doe' });
      expect(create).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const findOne = jest.spyOn(booksService, 'findOne').mockImplementation(() => Promise.resolve({} as any));
      const result = booksController.findOne(1);
      expect(findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual({});
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const update = jest.spyOn(booksService, 'update').mockImplementation(() => Promise.resolve({} as any));
      const result = booksController.update(1, { title: 'New Title' });
      expect(update).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  // describe('delete', () => {
  //   it('should delete a book', async () => {
  //     const delete = jest.spyOn(booksService, 'delete').mockImplementation(() => Promise.resolve());
  //     await booksController.delete(1);
  //     expect(delete).toHaveBeenCalledWith(1);
  //   });
  // });
});
