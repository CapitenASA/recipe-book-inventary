import { UpdateBookDto } from "./update-book.dto";

export class CreateBookDto extends UpdateBookDto {
    title: string;
    author: string;
}
