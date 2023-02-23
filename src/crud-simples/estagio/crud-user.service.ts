import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { EstagioUser } from "./crud-user.entity";

@Injectable()
export class EstagioUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(EstagioUser) protected repo)
    {
        super(repo)
    }

}