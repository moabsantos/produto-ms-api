import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { RequisicaoAlmoxarifado } from "./crud.entity";
import { RequisicaoAlmoxarifadoUser } from "./crud-user.entity";
import { ClienteService } from "../cliente/service";
import { EmpresaService } from "../empresa/service";
import { DepositoService } from "../deposito/service";
import { ClienteEstabelecimentoService } from "../cliente-estabelecimento/service";
import { RequisicaoGrupoService } from "../requisicao-grupo/service";
import { SetorService } from "../setor/service";

export class RequisicaoAlmoxarifadoService extends BaseCrudService{

    private empresa: any;
    private setor: any;
    private requisicaoGrupo: any;
    private cliente: any;
    private clienteEstab: any;
    private depositoOrigem: any;
    private depositoDestino: any;
    
    constructor (
        @InjectRepository(RequisicaoAlmoxarifado) protected repo,
        @InjectRepository(RequisicaoAlmoxarifadoUser) protected repoUser,
        private empresaServ: EmpresaService,
        private setorServ: SetorService,
        private requisicaoGrupoServ: RequisicaoGrupoService,
        private clienteServ: ClienteService,
        private clienteEstabServ: ClienteEstabelecimentoService,
        private depositoServ: DepositoService)
    {
        super(repo, repoUser)
        
        this.setRole({
            create: "sup-almox-req-dig",
            update: "sup-almox-req-dig",
            delete: "sup-almox-req-dig",
            get: "sup-almox-req-dig",
            aprovar: "sup-almox-req-aprov",
            atender: "sup-almox-req-aten",
        })
    }

    getDataFromDto(dto: any, user: any, model: RequisicaoAlmoxarifado){
 
        model.dataSolicitacao = dto.dataSolicitacao

        model.empresaName = this.empresa.name
        model.empresaSigla = this.empresa.sigla
        model.empresaId = dto.empresaId

        model.requisicaoGrupoName = this.requisicaoGrupo.name
        model.requisicaoGrupoSigla = this.requisicaoGrupo.sigla
        model.requisicaoGrupoId = dto.requisicaoGrupoId

        model.clienteName = dto.clienteId && dto.clienteId > 0 ? this.cliente.name : null
        model.clienteSigla = dto.clienteId && dto.clienteId > 0 ? this.cliente.sigla : null
        model.clienteId = dto.clienteId && dto.clienteId > 0 ? dto.clienteId : null

        model.clienteEstabelecimentoId = this.clienteEstab ? this.clienteEstab.id : null
        model.clienteEstabelecimentoName = this.clienteEstab ? this.clienteEstab.name : null
        model.clienteCep = this.clienteEstab && this.clienteEstab.cep > 0 ? this.clienteEstab.cep : null
        model.clienteCidadeName = this.clienteEstab && this.clienteEstab.cidadeName ? this.clienteEstab.cidadeName : null
        model.clienteCidadeUfSigla = this.clienteEstab ? this.clienteEstab.cidadeUfSigla : null

        model.depositoNameOrigem = this.depositoOrigem.name
        model.depositoCodeOrigem = this.depositoOrigem.code
        model.depositoSiglaOrigem = this.depositoOrigem.sigla
        model.depositoIdOrigem = dto.depositoIdOrigem

        model.depositoNameDestino = this.depositoDestino.name
        model.depositoCodeDestino = this.depositoDestino.code
        model.depositoSiglaDestino = this.depositoDestino.sigla
        model.depositoIdDestino = dto.depositoIdDestino

        model.setorName = this.setor.name
        model.setorSigla = this.setor.sigla
        model.setorId = dto.setorId

        return super.getDataFromDto(dto, user, model)
    }


    async foundDuplicated(dto: any, user: any): Promise<boolean> {

        if (!dto.name || !dto.code) return false

        let modelRepo = await this.repo.findOne({where:{name:dto.name, code: dto.code, realmId: user.realmId}})
        
        if(modelRepo && (!dto.id || dto.id != modelRepo.id)){

            return true
        }

        return false
    }

    async validate(dto: any, user: any): Promise<boolean>{

        this.empresa = await this.validateId(this.empresaServ, dto.empresaId, user)
        if (!this.empresa){
            this.logger.error(`A empresa ${dto.empresaId} não foi encontrada`)
            return false
        }

        this.requisicaoGrupo = await this.validateId(this.requisicaoGrupoServ, dto.requisicaoGrupoId, user)
        if (!this.requisicaoGrupo){
            this.logger.error(`Requisicao Grupo ${dto.requisicaoGrupoId} não foi encontrado`)
            return false
        }

        if (dto.clienteId && dto.clienteId > 0) this.cliente = await this.validateId(this.clienteServ, dto.clienteId, user)
        if (dto.clienteId && dto.clienteId > 0 && !this.cliente){
            this.logger.error(`O cliente ${dto.clienteId} não foi encontrada`)
            return false
        }

        if (dto.clienteId && dto.clienteId > 0 && dto.clienteEstabelecimentoId && dto.clienteEstabelecimentoId > 0) this.clienteEstab = await this.validateId(this.clienteEstabServ, dto.clienteEstabelecimentoId, user)
        if (dto.clienteEstabelecimentoId && dto.clienteEstabelecimentoId > 0 && !this.clienteEstab){
            this.logger.error(`O estabelecimento do cliente ${dto.clienteEstabId} não foi encontrado`)
            return false
        }

        this.depositoOrigem = await this.validateId(this.depositoServ, dto.depositoIdOrigem, user)
        if (!this.depositoOrigem){
            this.logger.error(`O Depósito ${dto.depositoIdOrigem} não foi encontrado`)
            return false
        }

        this.depositoDestino = await this.validateId(this.depositoServ, dto.depositoIdDestino, user)
        if (!this.depositoDestino){
            this.logger.error(`O Depósito ${dto.depositoIdDestino} não foi encontrado`)
            return false
        }

        this.setor = await this.validateId(this.setorServ, dto.setorId, user)
        if (!this.setor){
            this.logger.error(`O Setor ${dto.setorId} não foi encontrado`)
            return false
        }

        return super.validate(dto, user)
    }

}