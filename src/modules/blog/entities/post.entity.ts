import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Tag } from '../../tag/entities/tag.entity';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true })
  slug: string;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'longtext', nullable: true })
  description: string;
  @Column({ type: 'varchar', nullable: true })
  image: string;
  @Column({ type: 'longtext', nullable: true })
  excerpt: string;
  @Column({ type: 'longtext' })
  content: string;
  @Column({ type: 'longtext', nullable: true })
  keywords: string;
  @Column({ type: 'boolean', default: false })
  isPublish: boolean;
  @Column({ type: 'timestamp', nullable: true })
  published_at: Date;
  @ManyToMany(() => Tag, tag => tag.post, {
    nullable: true,
  })
  @JoinTable()
  tags: Tag[];
  @ManyToMany(() => Category, categories => categories.post, { nullable: true })
  @JoinTable()
  categories: Category[];
  @ManyToOne(() => User, user => user.posts, { nullable: false })
  @JoinTable()
  author: User;
  @ManyToMany(() => Post, post => post.related_post, { nullable: true })
  @JoinTable()
  related_post: Post[];
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
