import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;
}
