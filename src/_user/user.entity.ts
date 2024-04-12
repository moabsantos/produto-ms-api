import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  picture: string;

  @Column({unique: true})
  email: string;

  @Column({default: false})
  checked: boolean;

  @Column({default: 0})
  realmId: number;

  @Column({default: 0})
  realmName: string;

  @Column({default: 0})
  empresaId: number;

  @Column({default: 0})
  empresaName: string;

  @Column({default: 0})
  grupoId: number;

  @Column({default: 0})
  grupoName: string;

  @Column({default: 1})
  showGroupOwner: number;

  @Column({default: 10})
  limitDefault: number;
}