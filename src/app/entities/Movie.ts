import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Genre } from './Genre';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column()
    release_date!: Date;

    @ManyToOne(() => Genre)
    @JoinColumn({name:"genre_id"})
    genre!: Genre;

    @Column('decimal', { precision: 3, scale: 2 })
    rating!: number;

    @Column()
    duration!: number;
}
