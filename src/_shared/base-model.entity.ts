import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseModel {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    created_at: Date;

    @Column()
    created_by: number;

    @Column({nullable: true})
    updated_at: Date;

    @Column({nullable: true})
    updated_by: number;

    @Column({nullable: true})
    deleted_at: Date;

    @Column({nullable: true})
    deleted_by: number;

}