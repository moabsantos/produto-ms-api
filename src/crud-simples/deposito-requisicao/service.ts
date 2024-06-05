import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DepositoRequisicao } from "./crud.entity";
import { DepositoRequisicaoUser } from "./crud-user.entity";
import { DepositoSaldoService } from "../deposito-saldo/service";
import { ProdutoService } from "../produto/service";

export class DepositoRequisicaoService extends BaseCrudService{

    private qtdsName = [
        'Fornecedor', 'Pedida', 'Faturada', 'Recebida' 
        , 'Disponivel', 'Requisitada', 'Separada', 'Entregue'
        , 'Reservada', 'Bloqueada', 'Aprovada', 'Reprovada'
    ]

    constructor (
        @InjectRepository(DepositoRequisicao) protected repo,
        @InjectRepository(DepositoRequisicaoUser) protected repoUser,
        private itemServ: ProdutoService,
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
        model.itemCode = dto.itemCode
        model.itemName = dto.itemName
        model.itemSigla = dto.itemSigla
        model.itemDescription = dto.itemDescription
    

        model.itemGrupoId = dto.itemGrupoId
        model.itemGrupoCode = dto.itemGrupoCode
        model.itemGrupoName = dto.itemGrupoName
        model.itemGrupoSigla = dto.itemGrupoSigla


        model.unidadeMedidaId = dto.unidadeMedidaId
        model.unidadeMedidaName = dto.unidadeMedidaName
        model.unidadeMedidaSigla = dto.unidadeMedidaSigla
    
        model.loteId = dto.loteId
        model.loteCodigo = dto.loteCodigo
    
        model.setorId = dto.setorId
        model.setorName = dto.setorName
        model.setorSigla = dto.setorSigla
    
        model.depositoIdOrigem = dto.depositoIdOrigem
        model.depositoCodeOrigem = dto.depositoCodeOrigem
        model.depositoNameOrigem = dto.depositoNameOrigem
        model.depositoSiglaOrigem = dto.depositoSiglaOrigem
    
        model.depositoIdDestino = dto.depositoIdDestino
        model.depositoCodeDestino = dto.depositoCodeDestino
        model.depositoNameDestino = dto.depositoNameDestino
        model.depositoSiglaDestino = dto.depositoSiglaDestino
        
        this.qtdsName.forEach(element => {
            model['quantidade'+ element + 'Origem'] = dto['quantidade'+ element + 'Origem'] ? dto['quantidade'+ element + 'Origem'] : 0
            model['quantidade'+ element + 'Destino'] = dto['quantidade'+ element + 'Destino'] ? dto['quantidade'+ element + 'Destino'] : 0
        });

        model.origemRequisicaoName = dto.origemRequisicaoName
        model.origemRequisicaoId = dto.origemRequisicaoId

        return super.getDataFromDto(dto, user, model)
    }

    baixaSaldo(saldo: number, quantidade: number){

        if (!saldo) return quantidade * -1

        if (!quantidade) return saldo

        return saldo - quantidade

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
            depositoCode: depositoOrigem ? model.depositoCodeOrigem : model.depositoCodeDestino,
            depositoName: depositoOrigem ? model.depositoNameOrigem : model.depositoNameDestino,
            depositoSigla: depositoOrigem ? model.depositoSiglaOrigem : model.depositoSiglaDestino,
        
            
            itemId: model.itemId,
            itemCode: model.itemCode,
            itemName: model.itemName,
            itemSigla: model.itemSigla,
            itemDescription: model.itemDescription,
        

            itemGrupoId: model.itemGrupoId,
            itemGrupoCode: model.itemGrupoCode,
            itemGrupoName: model.itemGrupoName,
            itemGrupoSigla: model.itemGrupoSigla,

        
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

    getDtoSaldoToModel(dto, model){

        model.itemCode = dto.itemCode
        model.itemName = dto.itemName
        model.itemDescription = dto.itemDescription
        model.itemSigla = dto.itemSigla

        if (dto.depositoIdOrigem == model.depositoId) model.depositoCode = dto.depositoCodeOrigem
        if (dto.depositoIdOrigem == model.depositoId) model.depositoName = dto.depositoNameOrigem

        if (dto.depositoIdDestino == model.depositoId) model.depositoCode = dto.depositoCodeDestino
        if (dto.depositoIdDestino == model.depositoId) model.depositoName = dto.depositoNameDestino

        model.itemGrupoId = dto.itemGrupoId
        model.itemGrupoCode = dto.itemGrupoCode
        model.itemGrupoName = dto.itemGrupoName
        model.itemGrupoSigla = dto.itemGrupoSigla

        return model
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
        
        this.getDtoSaldoToModel(model, saldo)

        this.qtdsName.forEach(nomeDep => {
            saldo['quantidade'+ nomeDep] = this.baixaSaldo(Number(saldo['quantidade'+ nomeDep]), Number(dto['quantidade'+ nomeDep +'Origem']))
        })

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
        
        saldo = this.getDtoSaldoToModel(model, saldo)

        this.qtdsName.forEach(nomeDep => {
            saldo['quantidade'+ nomeDep] = this.adicionaSaldo(Number(saldo['quantidade'+ nomeDep]), Number(dto['quantidade'+ nomeDep +'Destino']))
        })

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

    async movimentacao(req: any, user: any, dto: any): Promise<any>{

        const item = await this.itemServ['repo'].find({where:{id: dto.item.itemId, realmId: user.realmId}})

        const qtdsName = [
            'Disponivel', 'Requisitada', 'Separada', 'Entregue'
            , 'Fornecedor', 'Pedida', 'Faturada', 'Recebida'
            , 'Reservada', 'Bloqueada', 'Aprovada', 'Reprovada'
        ]

        if (!dto.quantidadeEntregue) return

        const listReqDeposito = await this.repo.find({where:{
            origemRequisicaoName: dto.origemRequisicaoName, origemRequisicaoId: dto.id, 
            empresaId: dto.EmpresaId, realmId: user.realmId}})

        let totalEventos = 0

        let qtdEventos = 0

        listReqDeposito.forEach(element => {
            const qtdDisponivel = 
                element['quantidade'+ dto.quantidadeOrigemName + 'Origem'] 
                - element['quantidade'+ dto.quantidadeOrigemName + 'Destino']

            if (dto.depositoIdOrigem == element.depositoIdOrigem && dto.depositoIdDestino == element.depositoIdDestino)
             totalEventos = totalEventos + Number(qtdDisponivel)
            if (dto.depositoIdOrigem != dto.depositoIdDestino && dto.depositoIdOrigem == element.depositoIdDestino && dto.depositoIdDestino == element.depositoIdOrigem)
                totalEventos = totalEventos - Number(qtdDisponivel)
            qtdEventos = qtdEventos +1
        });
        
        const novaQtdEvt = dto.quantidadeEntregue - totalEventos

        if (novaQtdEvt == 0) return

        const codEvt = 'RLM'+ dto.capa.realmId +'EMP'+ dto.capa.empresaId +'CAPA'+ dto.capa.id +'ITEM'+ dto.item.id +'EVT'+ qtdEventos
        let objEvt = {
            code: codEvt,
            name: codEvt,
            
            empresaId: dto.capa.empresaId,
            empresaName: dto.capa.empresaName,
            empresaSigla: dto.capa.empresaSigla,
            

            itemGrupoId: item[0].produtoGrupoId,
            itemGrupoCode: item[0].produtoGrupoCode,
            itemGrupoName: item[0].produtoGrupoName,
            itemGrupoSigla: item[0].produtoGrupoSigla,


            itemId: item[0].id,
            itemCode: item[0].code,
            itemName: item[0].name,
            itemSigla: item[0].sigla,
            itemDescription: item[0].description,
        
            unidadeMedidaId: dto.item.unidadeMedidaId ? dto.item.unidadeMedidaId : item[0].unidadeMedidaId,
            unidadeMedidaName: dto.item.unidadeMedidaName ? dto.item.unidadeMedidaName : item[0].unidadeMedidaName,
            unidadeMedidaSigla: dto.item.unidadeMedidaSigla ? dto.item.unidadeMedidaSigla : item[0].unidadeMedidaSigla,
        
            loteId: dto.lote.id,
            loteCodigo: dto.lote.code,
        
            setorId: dto.item.setorId,
            setorName: dto.item.setorName,
            setorSigla: dto.item.setorSigla,
        
            depositoIdOrigem: novaQtdEvt > 0 ? dto.depositoIdOrigem : dto.depositoIdDestino,
            depositoCodeOrigem: novaQtdEvt > 0 ? dto.depositoCodeOrigem : dto.depositoCodeDestino,
            depositoNameOrigem: novaQtdEvt > 0 ? dto.depositoNameOrigem : dto.depositoNameDestino,
            depositoSiglaOrigem: novaQtdEvt > 0 ? dto.depositoSiglaOrigem : dto.depositoSiglaDestino,
        
            depositoIdDestino: novaQtdEvt > 0 ? dto.depositoIdDestino : dto.depositoIdOrigem,
            depositoCodeDestino: novaQtdEvt > 0 ? dto.depositoCodeDestino : dto.depositoCodeOrigem,
            depositoNameDestino: novaQtdEvt > 0 ? dto.depositoNameDestino : dto.depositoNameOrigem,
            depositoSiglaDestino: novaQtdEvt > 0 ? dto.depositoSiglaDestino : dto.depositoSiglaOrigem,
            
            origemRequisicaoName: dto.origemRequisicaoName,
            origemRequisicaoId: dto.id
        }

        qtdsName.forEach(element => {
            objEvt['quantidade'+ element + 'Origem'] = 0
            objEvt['quantidade'+ element + 'Destino'] = 0
        });
        
        if (novaQtdEvt > 0) {
            objEvt['quantidade'+ dto.quantidadeOrigemName + 'Origem'] = dto.quantidadeEntregue
            objEvt['quantidade'+ dto.quantidadeDestinoName + 'Destino'] = dto.quantidadeEntregue
        }

        if (novaQtdEvt < 0) {
            objEvt['quantidade'+ dto.quantidadeOrigemName + 'Destino'] = dto.quantidadeEntregue
            objEvt['quantidade'+ dto.quantidadeDestinoName + 'Origem'] = dto.quantidadeEntregue
        }

        await this.save(req, user, objEvt)

        return null
    }

    getFieldsResumo(){

        const fieldsResumo = {
            groupName: "resumoCardex",
            customGrupo: (payload: any) => 'It'+ payload.itemId+'-DpO'+payload.depositoIdOrigem+'-DpD'+payload.depositoIdDestino+'-Un'+payload.unidadeMedidaId,
            fieldName: "centroCustoName",
            customField: (payload: any) =>{ return {
                id: 'It'+ payload.itemId+'-DpO'+payload.depositoIdOrigem+'-DpD'+payload.depositoIdDestino+'-Un'+payload.unidadeMedidaId,
                depositoNameOrigem: payload.depositoNameOrigem,
                depositoNameDestino: payload.depositoNameDestino,
                itemName: payload.itemName,
                unidadeMedidaSigla: payload.unidadeMedidaSigla,
            }},

            }

        return [
            {
                ...fieldsResumo,
                fieldValue: "quantidadeDisponivelOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeReservadaOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeBloqueadaOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeReprovadaOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeAprovadaOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeRequisitadaOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeSeparadaOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeEntregueOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeFornecedorOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadePedidaOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeFaturadaOrigem"
            },
            {
                ...fieldsResumo,
                fieldValue: "quantidadeRecebidaOrigem"
            }
        ]
    }

}