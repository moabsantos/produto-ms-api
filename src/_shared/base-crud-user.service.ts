import { InjectRepository } from "@nestjs/typeorm";
import { BaseModelUser } from "./base-model-user";
import { CustomService } from './custom.service';

export class BaseCrudUserService extends CustomService<BaseModelUser>{

    constructor (
        @InjectRepository(BaseModelUser) protected repo)
    {
        super(repo)
    }

    async foundDuplicated(dto: any, user: any): Promise<any> {

        if (!dto.name) return {status: false, error: true, message: "Nome não informado"}

        let modelRepo = await this.repo.find({where:{userId:user.userId, originId: dto.originId}})
        
        if(modelRepo && modelRepo.length > 0) return {status: true, message: "Id cadastrado para o usuario"}

        return {status: false, message: "Não encontrada duplicação"}
    }

}