import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column('simple-array')
  ingredients: string[];

  @Column('simple-array')
  directions: string[];

  @Column('simple-array')
  tags: string[];

  @Column()
  prepTime: number;

  @Column()
  cookTime: number;

  @Column()
  servings: number;

  @Column()
  totalTime: number;
}
