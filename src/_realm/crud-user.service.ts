import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { RealmUser } from "./crud-user.entity";


@Injectable()
export class RealmUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RealmUser) protected repo)
    {
        super(repo)
    }

}