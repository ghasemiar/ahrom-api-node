import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../blog/entities/post.entity';
import { UserRole } from '../../../types/enums';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  username: string;
  @Column({ type: 'varchar', nullable: true })
  password: string;
  @OneToMany(() => Post, post => post.author)
  posts: Post[];
  @Column({ type: 'enum', enum: UserRole, default: UserRole.ADMIN })
  role: UserRole;
}
