import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Property } from './property.entity';
import type { User } from './user.entity';

@Entity({ name: 'reviews' })
export class Review extends BaseEntity {
  @Column({ type: 'integer' })
  @Index('idx_reviews_rating')
  rating!: number;

  @Column({ nullable: true })
  comment?: string;


@Column({ name: 'property_id' })
  propertyId!: string;

  @Index('idx_reviews_property_id')
  @ManyToOne('Property', 'reviews')
  @JoinColumn({ name: 'property_id' })
  property!: Property;

  @Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_reviews_user_id')
  @ManyToOne('User', 'reviews')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
