import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Maria Pi' })
  readonly name: string;

  @ApiProperty({ example: 'mi@mail.com' })
  readonly email: string;

  @ApiProperty({ example: '1234' })
  password: string;
}
