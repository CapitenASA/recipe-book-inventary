import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // crear validadores de campos: email, required
  @Column()
  email: string;
  //validador required
  @Column()
  password: string;
  username: any;
  userId: any;
}
