import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";
import { RealmUser } from "./crud-user.entity";
import { Realm } from "./crud.entity";


export class RealmService extends BaseCrudService{

    constructor (
        @InjectRepository(Realm) protected repo,
        @InjectRepository(RealmUser) protected repoUser)
    {
        super(repo, repoUser)
    }

    async validate(dto: any, user: number): Promise<boolean>{

        if (!user){
            this.logger.error("login is requerid")
            return
        }

        if (!dto.id && !dto.name){
            return false
        }

        return true

    }

}