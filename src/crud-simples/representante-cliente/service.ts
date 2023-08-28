import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { RepresentanteCliente } from "./crud.entity";
import { RepresentanteClienteUser } from "./crud-user.entity";

import { EmpresaService } from "../empresa/service";
import { RepresentanteService } from "../representante/service";
import { ClienteService } from "../cliente/service";

export class RepresentanteClienteService extends BaseCrudService{

    constructor (
        @InjectRepository(RepresentanteCliente) protected repo,
        @InjectRepository(RepresentanteClienteUser) protected repoUser,
        private empresaServ: EmpresaService,
        private representanteServ: RepresentanteService,
        private clienteServ: ClienteService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "com-representante-cliente-dig",
            update: "com-representante-cliente-dig",
            delete: "com-representante-cliente-dig",
            get: "com-representante-cliente-dig"
        })

        this.modelsRequired = [
            {fieldName: 'representante', service: this.representanteServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'empresa', service: this.empresaServ, fields: ['name', 'sigla', 'id', 'code'], getId: () => this['representante'].empresaId},
            {fieldName: 'cliente', service: this.clienteServ, fields: ['name', 'sigla', 'id', 'code']},
        ]
    }

    getDataFromDto(dto: any, user: any, model: RepresentanteCliente){

        model = this.getDataModelsFromDto(model)
        
        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        dto.name = 'REALM_'+ user.realmId +'_EMP'+ this['representante'].empresaId +'_REPR_'+ this['representante'].id +'_CLI_'+ this['cliente'].id
        dto.code = dto.name

        return super.validate(dto, user)
    }

}