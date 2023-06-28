import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DepositoRequisicao } from "./crud.entity";
import { DepositoRequisicaoUser } from "./crud-user.entity";
import { DepositoSaldoService } from "../deposito-saldo/service";

export class DepositoRequisicaoService extends BaseCrudService{

    private saldo: any;

    constructor (
        @InjectRepository(DepositoRequisicao) protected repo,
        @InjectRepository(DepositoRequisicaoUser) protected repoUser,
        private saldoServ: DepositoSaldoService)
    {
        super(repo, repoUser)
    }

    getDataFromDto(dto: any, user: any, model: DepositoRequisicao){
        
        model.code = dto.code
        model.name = dto.name
        
        model.empresaId = dto.empresaId
        model.empresaName = dto.empresaName
        model.empresaSigla = dto.empresaSigla
    
        model.itemId = dto.itemId
        model.itemName = dto.itemName
        model.itemSigla = dto.itemSigla
        model.itemDescription = dto.itemDescription
    
        model.unidadeMedidaId = dto.unidadeMedidaId
        model.unidadeMedidaName = dto.unidadeMedidaName
        model.unidadeMedidaSigla = dto.unidadeMedidaSigla
    
        model.loteId = dto.loteId
        model.loteCodigo = dto.loteCodigo
    
        model.setorId = dto.setorId
        model.setorName = dto.setorName
        model.setorSigla = dto.setorSigla
    
        model.depositoIdOrigem = dto.depositoIdOrigem
        model.depositoNameOrigem = dto.depositoNameOrigem
        model.depositoSiglaOrigem = dto.depositoSiglaOrigem
    
        model.depositoIdDestino = dto.depositoIdDestino
        model.depositoNameDestino = dto.depositoNameDestino
        model.depositoSiglaDestino = dto.depositoSiglaDestino
        

        const qtdsName = [
            'Disponivel', 'Requisitada', 'Separada', 'Entregue', 'Reservada', 'Bloqueada', 'Aprovada', 'Reprovada'
        ]
        qtdsName.forEach(element => {
            model['quantidade'+ element + 'Origem'] = dto['quantidade'+ element + 'Origem'] ? dto['quantidade'+ element + 'Origem'] : 0
            model['quantidade'+ element + 'Destino'] = dto['quantidade'+ element + 'Destino'] ? dto['quantidade'+ element + 'Destino'] : 0
        });

        model.origemRequisicaoName = dto.origemRequisicaoName
        model.origemRequisicaoId = dto.origemRequisicaoId

        return super.getDataFromDto(dto, user, model)
    }

    baixaSaldo(saldo: number, quantidade: number){

        if (!saldo) return 0

        if (!quantidade) return saldo

        if (saldo > quantidade) {
            return saldo - quantidade
        }

        if (saldo <= quantidade) {
            return 0
        }

        return 0
    }

    async novoSaldoRequisicao(req: any, user: any, model: DepositoRequisicao, depositoOrigem: boolean){

        const dep = depositoOrigem ? model.depositoIdOrigem : model.depositoIdDestino

        const code = 
            'RLM'+ model.realmId + 'EMP'+ model.empresaId + 'DEP'+ dep +
            'ITM'+ model.itemId +  'UND'+ model.unidadeMedidaId +'LT'+ model.loteId

        return {

            realmId: model.realmId,
            created_at: new Date(),
            created_by: user.userId,

            code: code,
            name: code,

            empresaId: model.empresaId,
            empresaName: model.empresaName,
            empresaSigla: model.empresaSigla,
        
        
            depositoId: depositoOrigem ? model.depositoIdOrigem : model.depositoIdDestino,
            depositoName: depositoOrigem ? model.depositoNameOrigem : model.depositoNameDestino,
            depositoSigla: depositoOrigem ? model.depositoSiglaOrigem : model.depositoSiglaDestino,
        
            
            itemId: model.itemId,
            itemName: model.itemName,
            itemSigla: model.itemSigla,
            itemDescription: model.itemDescription,
        
        
            unidadeMedidaId: model.unidadeMedidaId,
            unidadeMedidaName: model.unidadeMedidaName,
            unidadeMedidaSigla: model.unidadeMedidaSigla,
        
        
            loteId: model.loteId,
            loteCodigo: model.loteCodigo,
        
        
            quantidadeTotal: 0,
            quantidadeDisponivel: 0,
        
        
            quantidadeRequisitada: 0,
            quantidadeSeparada: 0,
            quantidadeEntregue: 0,
        
        
            quantidadeRecebida: 0,
            quantidadeReservada: 0,
            quantidadeBloqueada: 0,
        
            quantidadeReprovada: 0,
            quantidadeAprovada: 0
        }
    }

    async setSaldoDepositoOrigem(req: any, dto: any, user: any, model: DepositoRequisicao) {

        const listSaldo = await this.saldoServ['repo'].find({where:{
            realmId: model.realmId,
            empresaId: dto.empresaId,
            depositoId: dto.depositoIdOrigem,
            itemId: dto.itemId,
            unidadeMedidaId: dto.unidadeMedidaId,
            loteId: dto.loteId,
            
            }
        })

        if (listSaldo.length > 1) return

        let saldo = listSaldo.length == 1 ? listSaldo[0] : await this.novoSaldoRequisicao(req, user, model, true)

        saldo.quantidadeDisponivel = this.baixaSaldo(Number(saldo.quantidadeDisponivel), Number(dto.quantidadeDisponivelOrigem))
        saldo.quantidadeRequisitada = this.baixaSaldo(Number(saldo.quantidadeRequisitada), Number(dto.quantidadeRequisitadaOrigem))
        saldo.quantidadeSeparada = this.baixaSaldo(Number(saldo.quantidadeSeparada), Number(dto.quantidadeSeparadaOrigem))
        saldo.quantidadeEntregue = this.baixaSaldo(Number(saldo.quantidadeEntregue), Number(dto.quantidadeEntregueOrigem))

        await this.saldoServ['repo'].save(saldo)
    }

    adicionaSaldo(saldo: number, quantidade: number){

        if (!quantidade && !saldo) return 0

        if (!quantidade) return saldo

        if (!saldo) return quantidade

        return saldo + quantidade
    }

    async setSaldoDepositoDestino(req: any, dto: any, user: any, model: DepositoRequisicao) {

        const listSaldo = await this.saldoServ['repo'].find({where:{
            realmId: model.realmId,
            empresaId: dto.empresaId,
            depositoId: dto.depositoIdDestino,
            itemId: dto.itemId,
            unidadeMedidaId: dto.unidadeMedidaId,
            loteId: dto.loteId,
            
            }
        })

        if (listSaldo.length > 1) return

        let saldo = listSaldo.length == 1 ? listSaldo[0] : await this.novoSaldoRequisicao(req, user, model, false)

        saldo.quantidadeDisponivel = this.adicionaSaldo(Number(saldo.quantidadeDisponivel), Number(dto.quantidadeDisponivelDestino))
        saldo.quantidadeRequisitada = this.adicionaSaldo(Number(saldo.quantidadeRequisitada), Number(dto.quantidadeRequisitadaDestino))
        saldo.quantidadeSeparada = this.adicionaSaldo(Number(saldo.quantidadeSeparada), Number(dto.quantidadeSeparadaDestino))
        saldo.quantidadeEntregue = this.adicionaSaldo(Number(saldo.quantidadeEntregue), Number(dto.quantidadeEntregueDestino))

        await this.saldoServ['repo'].save(saldo)
    }

    async setSaldoDeposito(req: any, dto: any, user: any, model: DepositoRequisicao) {

        await this.setSaldoDepositoOrigem(req, dto, user, model)

        await this.setSaldoDepositoDestino(req, dto, user, model)

    }

    async afterSave(req: any, dto: any, user: any, model: DepositoRequisicao) {

        await this.setSaldoDeposito(req, dto, user, model)

        return await super.afterSave(req, dto, user, model)

    }

}