import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserPassword {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  codeVerification: string;

  @Column({nullable: true})
  validityCodeVerification: Date;

}