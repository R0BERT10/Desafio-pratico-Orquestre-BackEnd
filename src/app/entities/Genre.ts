import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export interface IGenreEssential {
    readonly name : string
}

@Entity()
export default class Genre implements IGenreEssential {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;
}
