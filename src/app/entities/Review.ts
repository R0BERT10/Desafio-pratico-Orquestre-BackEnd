import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import Movie from './Movie';
import User from './User';

export interface IReviewEssential {
    readonly user: User,
    readonly movie: Movie,
    readonly rating: string,
    readonly comment: string
}

@Entity()
export default class Review {
    @PrimaryGeneratedColumn()
    review_id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_uid" })
    user!: User;

    @ManyToOne(() => Movie)
    @JoinColumn({ name: "movie_id" })
    movie!: Movie;

    @Column()
    rating!: number;

    @Column('text')
    comment!: string;

    @CreateDateColumn()
    created_at!: Date;
}
