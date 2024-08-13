import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Genre from './Genre';

export interface IMovieEssential {
    readonly title : string,
    readonly description : string,
    readonly release_date : Date,
    readonly genre : Genre,
    readonly rating : number,
    readonly duration : null
}

@Entity()
export default class Movie {
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
