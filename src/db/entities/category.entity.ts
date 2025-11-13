import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
}
