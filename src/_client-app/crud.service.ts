import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { ClientAppUser } from "./crud-user.entity";
import { ClientApp } from "./crud.entity";

export class ClientAppService extends BaseCrudService{

    constructor (
        @InjectRepository(ClientApp) protected repo,
        @InjectRepository(ClientAppUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        if (!user.realmId){
            this.logger.error("login in Realm is requerid")
            return
        }

        return this.validate(dto, user)

    }

    getDataFromDto(dto: any, user: any, model: ClientApp){
        model.realmId = user.realmId
        return super.getDataFromDto(dto, user, model)
    }

}