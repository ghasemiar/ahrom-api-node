import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Post } from '../../blog/entities/post.entity';
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @ManyToMany(() => Post, post => post.tags)
  post: Post[];
}
