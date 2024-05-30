import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
@Index(["token", "dominio"])
@Index(["email"])
export class UserToken {

  @PrimaryColumn()
  dominioEmail: string;

  @Column({length: 2000})
  token: string;

  @Column()
  dominio: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  picture: string;

  @Column()
  email_verified: boolean;

  @Column()
  created_at: Date;

  @Column()
  expire_at: Date;

  @Column()
  exp: string;

}