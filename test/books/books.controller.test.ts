import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from 'src/books/books.controller';
import { BooksService } from 'src/books/books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { UpdateBookDto } from '../books/dto/update-book.dto';
import { NotFoundException } from '@nestjs/common';

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
            const books = [{ id: 1, title: 'Test Book', author: 'John Doe' }];
            jest.spyOn(booksService, 'findAll').mockImplementation(() => Promise.resolve(books));

            expect(await booksController.findAll()).toBe(books);
        });
    });

    describe('create', () => {
        it('should create a book', async () => {
            const createBookDto: CreateBookDto = { title: 'Test Book', author: 'John Doe' };
            const book = { id: 1, ...createBookDto };
            jest.spyOn(booksService, 'create').mockImplementation(() => Promise.resolve(book));

            expect(await booksController.create(createBookDto)).toBe(book);
        });
    });

    describe('findOne', () => {
        it('should return a book', async () => {
            const book = { id: 1, title: 'Test Book', author: 'John Doe' };
            jest.spyOn(booksService, 'findOne').mockImplementation(() => Promise.resolve(book));

            expect(await booksController.findOne(1)).toBe(book);
        });

        it('should throw NotFoundException when book is not found', async () => {
            jest.spyOn(booksService, 'findOne').mockImplementation(() => Promise.resolve(null));

            try {
                await booksController.findOne(1);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('update', () => {
        it('should update a book', async () => {
            const updateBookDto: UpdateBookDto = {
                title: 'New Title    };
    const book = { id: 1, ...updateBookDto };
                jest.spyOn(booksService, 'update').mockImplementation(() => Promise.resolve(book));

                expect(await booksController.update(1, updateBookDto)).toBe(book);
    });
});

    it('should throw NotFoundException when book is not found', async () => {
        const updateBookDto: UpdateBookDto = { title: 'New Title' };
        jest.spyOn(booksService, 'update').mockImplementation(() => Promise.resolve(null));

        try {
            await booksController.update(1, updateBookDto);
        } catch (e) {
            expect(e).toBeInstanceOf(NotFoundException);
        }
    });
});

describe('delete', () => {
    it('should delete a book', async () => {
        jest.spyOn(booksService, 'delete').mockImplementation(() => Promise.resolve());

        expect(await booksController.delete(1)).toBeUndefined();
    });

    it('should throw NotFoundException when book is not found', async () => {
        jest.spyOn(booksService, 'delete').mockImplementation(() => Promise.resolve(null));

        try {
            await booksController.delete(1);
        } catch (e) {
            expect(e).toBeInstanceOf(NotFoundException);
        }
    });
});