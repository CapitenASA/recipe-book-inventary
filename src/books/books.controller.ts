import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
// import { JwtStrategy } from '../auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
  update(arg0: number, arg1: { title: string; }) {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  create(arg0: { title: string; author: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly booksService: BooksService) {}

  @Get()
  //   findAll(@Query('sort') sort?: string) {
  //     const params = [];
  //     if (sort != undefined) {
  //       params.push(`${sort}`);
  //     }
  //     return this.booksService.findAll(params);
  //   }
  findAll(@Query() params?: any) {
    return this.booksService.findAll(params);
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string) {
    return this.booksService.findBook(bookId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createBook(@Body() newBook: CreateBookDto) {
    // const newBook: any = body;
    return this.booksService.createBook(newBook);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string) {
    return this.booksService.deleteBook(bookId);
  }

  @Put(':bookId')
  updateBook(@Body() newBook: UpdateBookDto, @Param('bookId') bookId: string) {
    // const newBook: any = body;
    return this.booksService.updateBook(bookId, newBook);
  }
}
