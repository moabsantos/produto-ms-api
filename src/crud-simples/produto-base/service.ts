import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ProdutoBase } from "./crud.entity";
import { ProdutoBaseUser } from "./crud-user.entity";
import { ProdutoGrupoService } from "../produto-grupo/service";

export class ProdutoBaseService extends BaseCrudService{

    private produtoGrupo: any;

    constructor (
        @InjectRepository(ProdutoBase) protected repo,
        @InjectRepository(ProdutoBaseUser) protected repoUser,
    
        private produtoGrupoServ: ProdutoGrupoService
    ){
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: ProdutoBase){

        model.produtoGrupoName = this.produtoGrupo.name
        model.produtoGrupoCode = this.produtoGrupo.code
        model.produtoGrupoSigla = this.produtoGrupo.sigla
        model.produtoGrupoId = this.produtoGrupo.id

        model.endDescription = dto.endDescription

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const produtoGrp = await this.produtoGrupoServ.findByWhere({
            id: dto.produtoGrupoId,
            realmId: user.realmId
        })

        if (produtoGrp.length == 0){
            this.logger.error(`O Grupo de Produto ${dto.produtoGrupoId} não foi encontrado`)
            return false
        }
        this.produtoGrupo = produtoGrp[0]

        

        dto.name = this.produtoGrupo.name
        if (dto.endDescription) dto.name = `${dto.name} ${dto.endDescription}`

        if (!dto.name){
            return false
        }

        return super.validate(dto, user)

    }

}