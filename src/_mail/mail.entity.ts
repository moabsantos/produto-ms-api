import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mail {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}