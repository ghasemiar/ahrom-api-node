import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../blog/entities/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @ManyToMany(() => Post, post => post.categories)
  post: Post[];
}
