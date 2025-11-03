import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'properties' })
export class Property extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  @Index('idx_properties_location')
  location!: string;

  @Column({ type: 'integer' })
  @Index('idx_properties_price')
  price!: number;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_properties_user_id')
  @ManyToOne('User', 'properties')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
