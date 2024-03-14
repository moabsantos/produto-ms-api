import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoCompra } from "./crud.entity";
import { PedidoCompraUser } from "./crud-user.entity";
import { EmpresaService } from "../empresa/service";
import { DepositoService } from "../deposito/service";
import { FornecedorService } from "../fornecedor/service";
import { FormaPagamentoService } from "../forma-pagamento/service";
import { SetorService } from "../setor/service";

export class PedidoCompraService extends BaseCrudService{

    private empresa: any;
    private setor: any;
    private depositoOrigem: any;
    private depositoDestino: any;
    private fornecedor: any;
    private formaPagamento: any;
    
    constructor (
        @InjectRepository(PedidoCompra) protected repo,
        @InjectRepository(PedidoCompraUser) protected repoUser,
        private empresaServ: EmpresaService,
        private setorServ: SetorService,
        private fornecedorServ: FornecedorService,
        private formaPagamentoServ: FormaPagamentoService,
        private depositoServ: DepositoService)
    {
        super(repo, repoUser)
        
        this.setRole({
            create: "sup-compra-ped-dig",
            update: "sup-compra-ped-dig",
            delete: "sup-compra-ped-dig",
            get: "sup-compra-ped-dig",
            aprovar: "sup-compra-ped-aprov",
            atender: "sup-compra-ped-aten",
        })
    }

    getDataFromDto(dto: any, user: any, model: PedidoCompra){
 
        model.dataSolicitacao = dto.dataSolicitacao

        model.empresaName = this.empresa.name
        model.empresaSigla = this.empresa.sigla
        model.empresaId = dto.empresaId

        model.fornecedorName = this.fornecedor.name
        model.fornecedorCode = this.fornecedor.code
        model.fornecedorSigla = this.fornecedor.sigla
        model.fornecedorId = dto.fornecedorId

        model.setorId = this.setor.id
        model.setorName = this.setor.name
        model.setorSigla = this.setor.sigla

        model.formaPagamentoName = this.formaPagamento.name
        model.formaPagamentoCode = this.formaPagamento.code
        model.formaPagamentoSigla = this.formaPagamento.sigla
        model.formaPagamentoId = dto.formaPagamentoId

        model.depositoNameOrigem = this.depositoOrigem.name
        model.depositoCodeOrigem = this.depositoOrigem.code
        model.depositoSiglaOrigem = this.depositoOrigem.sigla
        model.depositoIdOrigem = dto.depositoIdOrigem

        model.depositoNameDestino = this.depositoDestino.name
        model.depositoCodeDestino = this.depositoDestino.code
        model.depositoSiglaDestino = this.depositoDestino.sigla
        model.depositoIdDestino = dto.depositoIdDestino

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

        this.setor = await this.validateId(this.setorServ, dto.setorId, user)
        if (!this.setor){
            this.logger.error(`O setor ${dto.setorId} não foi encontrado`)
            return false
        }

        this.fornecedor = await this.validateId(this.fornecedorServ, dto.fornecedorId, user)
        if (!this.fornecedor){
            this.logger.error(`O Fornecedor ${dto.fornecedorId} não foi encontrado`)
            return false
        }

        this.formaPagamento = await this.validateId(this.formaPagamentoServ, dto.formaPagamentoId, user)
        if (!this.formaPagamento){
            this.logger.error(`A Forma de Pagamento ${dto.formaPagamentoId} não foi encontrada`)
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

        return super.validate(dto, user)
    }

}