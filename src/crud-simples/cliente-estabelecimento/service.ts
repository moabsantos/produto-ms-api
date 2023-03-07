import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { ClienteEstabelecimento } from "./crud.entity";
import { ClienteEstabelecimentoUser } from "./crud-user.entity";
import { ClienteService } from "../cliente/service";
import { CidadeService } from "../cidade/service";

export class ClienteEstabelecimentoService extends BaseCrudService{

    cliente: any;
    cidade: any;

    constructor (
        @InjectRepository(ClienteEstabelecimento) protected repo,
        @InjectRepository(ClienteEstabelecimentoUser) protected repoUser,
        private clienteServ: ClienteService,
        private cidadeServ: CidadeService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: ClienteEstabelecimento){

        model.clienteId = this.cliente.id
        model.clienteName = this.cliente.name
        model.clienteSigla = this.cliente.sigla
    
        model.cnpj = dto.cnpj
        model.inscricaoEstadual = dto.inscricaoEstadual
    
        model.email = dto.email
        model.telefone = dto.telefone
    
        model.endereco = dto.endereco
        model.numero = dto.numero
        model.bairro = dto.bairro
    
        model.cidadeId = this.cidade.id
        model.cidadeName = this.cidade.name
        model.cidadeSigla = this.cidade.sigla

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{
        
        const clientes = await this.clienteServ.findByWhere({
            id: dto.clienteId,
            realmId: user.realmId
        })

        if (clientes.length == 0){
            this.logger.error(`O Cliente ${dto.clienteId} não foi encontrado`)
            return false
        }
        this.cliente = clientes[0]

        const cidades = await this.cidadeServ.findByWhere({
            id: dto.cidadeId,
            realmId: user.realmId
        })

        if (cidades.length == 0){
            this.logger.error(`A Cidade ${dto.cidadeId} não foi encontrada`)
            return false
        }
        this.cidade = cidades[0]

        return super.validate(dto, user)

    }

}