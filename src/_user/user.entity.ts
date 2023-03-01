import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  picture: string;

  @Column({unique: true})
  email: string;

  @Column({default: false})
  checked: boolean;

  @Column()
  realmId: number;

  @Column()
  empresaId: number;

  @Column()
  grupoId: number;
}