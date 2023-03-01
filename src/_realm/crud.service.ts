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

    async addRealmToUser(req: any, user: any){

        const realms = await this.findByWhere({created_by: user.userId})

        if (realms && realms[0]){
            return realms[0]
        }

        return {id: await this.save(req, user, { name: user.name })}

    }

    async foundDuplicated(dto: any, user: any): Promise<boolean> {

        if (!dto.name){
            return false
        }

        let modelRepo = await this.repo.findOne({where:{created_by:user.userId}})

        if(modelRepo && (!dto.id || dto.id != modelRepo.id)){

            return true
        }

        return false
    }

}