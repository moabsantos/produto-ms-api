import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { BaseModelUser } from "src/_shared/base-model-user";
import { RealmUser } from "./crud-user.entity";


@Injectable()
export class RealmUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RealmUser) protected repo)
    {
        super(repo)
    }

    getDataFromDto(dto: any, user: any, model: RealmUser){

        model.originId = dto.originId
        model.userId = dto.userId
        model.isAdmin = dto.isAdmin

        return model
    }

}