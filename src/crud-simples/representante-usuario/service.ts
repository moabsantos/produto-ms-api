import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { RepresentanteUsuario } from "./crud.entity";
import { RepresentanteUsuarioUser } from "./crud-user.entity";

import { EmpresaService } from "../empresa/service";
import { RepresentanteService } from "../representante/service";
import { UserService } from "src/_user/user.service";

export class RepresentanteUsuarioService extends BaseCrudService{

    constructor (
        @InjectRepository(RepresentanteUsuario) protected repo,
        @InjectRepository(RepresentanteUsuarioUser) protected repoUser,
        private empresaServ: EmpresaService,
        private usuarioServ: UserService,
        private representanteServ: RepresentanteService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "com-representante-usuario-dig",
            update: "com-representante-usuario-dig",
            delete: "com-representante-usuario-dig",
            get: "com-representante-usuario-dig"
        })

        this.modelsRequired = [
            {fieldName: 'representante', service: this.representanteServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'empresa', service: this.empresaServ, fields: ['name', 'sigla', 'id', 'code'], getId: () => this['representante'].empresaId},
        ]
    }

    getDataFromDto(dto: any, user: any, model: RepresentanteUsuario){

        model = this.getDataModelsFromDto(model)

        model.email = dto.email
        model.emailIdUsuario = this['usuario'].id
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
 
        this['usuario'] = await this.usuarioServ.getByEmail(dto.email)
 
        if (!this['usuario']) return false

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        dto.name = 'REALM_'+ user.realmId +'_EMP'+ this['representante'].empresaId +'_REPR_'+ this['representante'].id +'_email_'+ dto.email
        dto.code = dto.name

        return super.validate(dto, user)
    }

}