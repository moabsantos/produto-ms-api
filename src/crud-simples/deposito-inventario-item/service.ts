import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { DepositoInventarioItem } from "./crud.entity";
import { DepositoInventarioItemUser } from "./crud-user.entity";

import { EmpresaService } from "../empresa/service";
import { ProdutoService } from "../produto/service";
import { DepositoService } from "../deposito/service";
import { ProdutoGrupoService } from "../produto-grupo/service";
import { UnidadeMedidaService } from "../unidade-medida/service";
import { CrudRequest } from "@nestjsx/crud";
import { DepositoInventarioService } from "../deposito-inventario/service";
import { DepositoSaldoService } from "../deposito-saldo/service";
import { DepositoRequisicaoService } from "../deposito-requisicao/service";
import { Like } from "typeorm";

export class DepositoInventarioItemService extends BaseCrudService{

    constructor (
        @InjectRepository(DepositoInventarioItem) protected repo,
        @InjectRepository(DepositoInventarioItemUser) protected repoUser,

        private inventarioServ: DepositoInventarioService,
        private saldoServ: DepositoSaldoService,
        private empresaServ: EmpresaService,
        private itemServ: ProdutoService,
        private unidadeServ: UnidadeMedidaService,
        private itemGrupoServ: ProdutoGrupoService,
        private depositoServ: DepositoService,
        private depositoRequisicaoServ: DepositoRequisicaoService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "sup-deposito-inventario-dig",
            update: "sup-deposito-inventario-dig",
            delete: "sup-deposito-inventario-dig",
            get: "sup-deposito-inventario-dig"
        })

        this.modelsRequired = [
            {fieldName: 'depositoInventario', service: this.inventarioServ, fields: ['id']},
            {fieldName: 'deposito', service: this.depositoServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'empresa', service: this.empresaServ, fields: ['name', 'sigla', 'id', 'code'], getId: () => this['deposito'].empresaId},
            {fieldName: 'item', service: this.itemServ, fields: ['name', 'sigla', 'id', 'code', 'description']},
            {fieldName: 'unidadeMedida', service: this.unidadeServ, fields: ['name', 'sigla', 'id', 'code']},
            {fieldName: 'itemGrupo', service: this.itemGrupoServ, fields: ['name', 'sigla', 'id', 'code'], getId: () => this['item'].produtoGrupoId}
        ]
    }

    getDataFromDto(dto: any, user: any, model: DepositoInventarioItem){

        if (!model.status || model.status == 'Pendente' || model.status == 'Excluido') {
            model = this.getDataModelsFromDto(model)

            model.loteCodigo = dto.loteCodigo
            model.quantidadeImagem = dto.quantidadeImagem
            model.status = dto.status == 'Excluido' ? 'Excluido' : 'Pendente'
        }

        return super.getDataFromDto(dto, user, model)
    }

    async validate(dto: any, user: any): Promise<boolean>{

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid || !dtoValid.status) return dtoValid

        dto.name = 'REALM_'+ this['empresa'].realmId +'_EMP'+ this['empresa'].id +
                   '_DEPINVENT_'+ this['depositoInventario'].id +'_DEP_'+ this['deposito'].id +
                   '_ITEM_'+ dto.itemId +'_UND_'+ dto.unidadeMedidaId +'_LOTE_'+ dto.loteId
        dto.code = dto.name

        return super.validate(dto, user)
    }

    async importarSaldo(req: CrudRequest, user: any, param: any): Promise<any>{
        
        const inventario = await this.inventarioServ['repo'].find({where: {id: param.depositoInventarioId, realmId: user.realmId}})
        if (!inventario || inventario.length != 1) return {}

        const itensInventario = await this.repo.find({where:{
            realmId: inventario[0].realmId,
            depositoInventarioId: inventario[0].id
        }})

        for (let index = 0; index < itensInventario.length; index++) {
            const i = itensInventario[index];
            if (i.status != 'Pendente') continue;

            i.quantidadeImagem = 0
            i.quantidadeContagem = 0
            i.status = 'Excluido'

            await this.save(req, user, i)
        }


        // atualizando grupo dos itens que inseridos em deposito-saldo
        const itensGrupo = await this.itemServ['repo'].find({where:{produtoGrupoId: inventario[0].itemGrupoId, realmId: user.realmId}})

        for (let indexIG = 0; indexIG < itensGrupo.length; indexIG++) {
            const itemGrupo = itensGrupo[indexIG];
            
            const itensSaldo = await this.saldoServ['repo'].find({where:{itemId: itemGrupo.id, depositoId: inventario[0].depositoId, realmId: user.realmId}})
            for (let indexIS = 0; indexIS < itensSaldo.length; indexIS++) {
                const itemSaldo = itensSaldo[indexIS];
                if (itemSaldo.itemGrupoId == itemGrupo.produtoGrupoId) continue

                itemSaldo.itemGrupoId = itemGrupo.produtoGrupoId
                itemSaldo.itemGrupoName = itemGrupo.produtoGrupoName
                itemSaldo.itemGrupoCode = itemGrupo.produtoGrupoCode
                itemSaldo.itemGrupoSigla = itemGrupo.produtoGrupoSigla
                
                await this.saldoServ.save(req, user, itemSaldo)
            }
        }


        let filterSaldo = {
            realmId: inventario[0].realmId,
            empresaId: inventario[0].empresaId,
            depositoId: inventario[0].depositoId
        }

        const itensGrupoIventario = await this.itemServ['repo'].find({where:{produtoGrupoId: inventario[0].produtoGrupoId, realmId: inventario[0].realmId}})
        for (let index = 0; index < itensGrupoIventario.length; index++) {
            const item = itensGrupoIventario[index];
            
            let saldos = await this.saldoServ['repo'].find({where:{
                ...filterSaldo,
                itemId: item.id
            }})

            for (let index = 0; index < saldos.length; index++) {
                const saldo = saldos[index];
    
                await this.saldoServ['repo'].save({
                    id: saldo.id,
    
                    itemGrupoId: item.produtoGrupoId,
                    itemGrupoCode: item.produtoGrupoCode,
                    itemGrupoName: item.produtoGrupoName,
                    itemGrupoSigla: item.produtoGrupoSigla,
                    
                    itemCode: item.code,
                    itemName: item.name,
                    itemSigla: item.sigla,
                    itemDescription: item.description
                })
            }

        }



        if (inventario[0].itemGrupoId) filterSaldo['itemGrupoId'] = inventario[0].itemGrupoId
        if (inventario[0].itemId && inventario[0].itemId != '0') filterSaldo['itemId'] = inventario[0].itemId
        if (inventario[0].itemPartialName) filterSaldo['itemName'] = Like(`%${inventario[0].itemPartialName}%`)

        let saldos = await this.saldoServ['repo'].find({where:filterSaldo})

        for (let index = 0; index < saldos.length; index++) {
            const saldo = saldos[index];

            filterSaldo['depositoInventarioId'] = inventario[0].id
            filterSaldo['itemId'] = saldo.itemId
            filterSaldo['unidadeMedidaId'] = saldo.unidadeMedidaId
            filterSaldo['loteId'] = saldo.loteId

            let itemInventario = {}

            let item = await this.repo.find({where:filterSaldo})
            if (item.length > 0) itemInventario['id'] = item[0].id

            itemInventario['realmId'] = inventario[0].realmId
            itemInventario['depositoInventarioId'] = inventario[0].id
            itemInventario['empresaId'] = inventario[0].empresaId
            itemInventario['depositoId'] = inventario[0].depositoId
            itemInventario['unidadeMedidaId'] = saldo.unidadeMedidaId
            itemInventario['itemId'] = saldo.itemId
            itemInventario['loteId'] = saldo.loteId
            itemInventario['loteCodigo'] = saldo.loteCodigo

            if (Number(saldo.quantidadeRequisitada) < 0) saldo.quantidadeRequisitada = 0
            if (Number(saldo.quantidadeSeparada) < 0) saldo.quantidadeSeparada = 0

            if (Number(saldo.quantidadeDisponivel) >= 0) itemInventario['quantidadeImagem'] = Number(saldo.quantidadeDisponivel) + Number(saldo.quantidadeRequisitada) + Number(saldo.quantidadeSeparada)
            if (Number(saldo.quantidadeDisponivel) < 0) itemInventario['quantidadeImagem'] = Number(saldo.quantidadeDisponivel) - Number(saldo.quantidadeRequisitada) - Number(saldo.quantidadeSeparada)

            if (itemInventario['status'] == 'Excluido') itemInventario['status'] = 'Pendente'

            await this.save(req, user, itemInventario)
        }

        return {}

    }

    async iniciarInventario(req: CrudRequest, user: any, param: any): Promise<any>{

        const checkPermissao = await user.hasPermissao('sup-deposito-inventario-iniciar')
        if (!checkPermissao.status) return checkPermissao
        
        await this.importarSaldo(req, user, param)

        const inventario = await this.inventarioServ['repo'].find({where: {id: param.depositoInventarioId, realmId: user.realmId}})
        if (!inventario || inventario.length != 1) return {}

        inventario[0].status = 'Aprovado'
        inventario[0].dataInicio = new Date()
        this.inventarioServ['repo'].save(inventario[0])

        const itensInventario = await this.repo.find({where:{
            realmId: inventario[0].realmId,
            depositoInventarioId: inventario[0].id,
            status: 'Pendente'
        }})

        for (let index = 0; index < itensInventario.length; index++) {
            const i = itensInventario[index];
            if (i.status != 'Pendente') continue;

            i.status = 'Aprovado'

            await this.updateRepoId(req, user, i)
        }
        
        return {}

    }

    async informarContagem(req: CrudRequest, user: any, param: any): Promise<any>{

        const checkPermissao = await user.hasPermissao('sup-deposito-inventario-contagem')
        if (!checkPermissao.status) return checkPermissao
        
        await this.importarSaldo(req, user, param)

        const inventario = await this.inventarioServ['repo'].find({where: {id: param.depositoInventarioId, realmId: user.realmId}})
        if (!inventario || inventario.length != 1) return {}

        if (inventario[0].status != 'Aprovado' && inventario[0].status != 'Em Contagem') return

        inventario[0].status = 'Em Contagem'
        this.inventarioServ['repo'].save(inventario[0])

        const itensInventario = await this.repo.find({where:{
            realmId: inventario[0].realmId,
            depositoInventarioId: inventario[0].id,
            id: param.id
        }})

        for (let index = 0; index < itensInventario.length; index++) {
            const i = itensInventario[index];
            if (i.status != 'Aprovado' && i.status != 'Em Contagem') continue;

            i.quantidadeContagem = param.quantidadeContagem
            i.status = 'Em Contagem'

            await this.updateRepoId(req, user, i)
        }
        
        return {status: true, error: false, message: "Atualização Finalizada", success:{id: param.id, updated_at: new Date()}}

    }


    async aplicarContagem(req: CrudRequest, user: any, param: any): Promise<any>{

        const checkPermissao = await user.hasPermissao('sup-deposito-inventario-processar')
        if (!checkPermissao.status) return checkPermissao

        const inventario = await this.inventarioServ['repo'].find({where: {id: param.depositoInventarioId, realmId: user.realmId}})
        if (!inventario || inventario.length != 1) return {}

        if (inventario[0].status != 'Aprovado' && inventario[0].status != 'Em Contagem') return this.getMessage(req, user, this, {status: false, error: true, message: "Status diferente de Aprovado e Em Contagem"})

        this.inventarioServ['repo'].save(inventario[0])

        const depContagem = await this.depositoServ['repo'].find({where:{realmId: inventario[0].realmId, id: inventario[0].depositoId}})
        if (!depContagem || depContagem.length != 1) return this.getMessage(req, user, this, {status: false, error: true, message: "Não encontrados o Depósito da Contagem"})

        const depInventario = await this.depositoServ['repo'].find({where:{realmId: inventario[0].realmId, id: inventario[0].depositoInventarioId}})
        if (!depInventario || depInventario.length != 1) return this.getMessage(null, user, this, {status: false, error: true, message: "Não encontrado o Depósito do Inventário"})

        const itensInventario = await this.repo.find({where:{
            realmId: inventario[0].realmId,
            depositoInventarioId: param.depositoInventarioId,
            id: param.id
        }})

        for (let index = 0; index < itensInventario.length; index++) {
            const i = itensInventario[index];
            if (i.status != 'Aprovado' && i.status != 'Em Contagem') continue;

            const saldos = await this.saldoServ['repo'].find({where:{
                realmId: i.realmId,
                empresaId: i.empresaId,
                depositoId: i.depositoId,
                itemId: i.itemId,
                unidadeMedidaId: i.unidadeMedidaId,
                loteId: i.loteId
            }})

            if (saldos.length != 1) return

            await this.ajustaSaldoDeposito(req, user, {
                id: i.id,
                capa: inventario[0],
                loteId: i.loteId,
                loteCodigo: i.loteCodigo,
                itemId: i.itemId,

                unidadeMedidaId: i.unidadeMedidaId,
                unidadeMedidaCode: i.unidadeMedidaCode,
                unidadeMedidaName: i.unidadeMedidaName,
                unidadeMedidaSigla: i.unidadeMedidaSigla,

                setorId: depContagem[0].setorId,
                setorName: depContagem[0].setorName,
                setorSigla: depContagem[0].setorSigla,
                
                depOrigem: depContagem[0],
                depDestino: depInventario[0],

                quantidadeDisponivel: Number(saldos[0].quantidadeDisponivel) - Number(i.quantidadeContagem),
                quantidadeRequisitada: Number(saldos[0].quantidadeRequisitada),
                quantidadeSeparada: Number(saldos[0].quantidadeSeparada),
            })
            
            i.status = 'Finalizado'
            await this.updateRepoId(req, user, i)
        }

        await this.finalizarContagem(req, user, {depositoInventarioId: param.depositoInventarioId})

        return {}

    }

    async finalizarContagem(req, user, dto){
        const inventario = await this.inventarioServ.getById(req, user, {id: dto.depositoInventarioId, realmId: user.realmId})
        if (!inventario) return {}

        if (inventario.status != 'Aprovado' && inventario.status != 'Em Contagem') return {}

        const itens = await this.repo.find({where: {
            depositoInventarioId: inventario.id,
            realmId: inventario.realmId
        }})

        let status = 'Finalizado'

        for (let index = 0; index < itens.length; index++) {
            const item = itens[index];
            if (status == 'Em Contagem') continue

            if (item.status == 'Em Contagem' || item.status == 'Aprovado') status = item.status
        }

        if (status != 'Finalizado') return {}

        inventario.dataTermino = new Date()
        inventario.status = 'Finalizado'
        await this.inventarioServ['repo'].save(inventario)
    }

    async ajustaDepositoMovimentacao(payload, depOrigem, depDestino){

        payload.depositoIdOrigem = depOrigem.id
        payload.depositoCodeOrigem = depOrigem.code
        payload.depositoNameOrigem = depOrigem.name
        payload.depositoSiglaOrigem = depOrigem.sigla

        payload.depositoIdDestino = depDestino.id
        payload.depositoCodeDestino = depDestino.code
        payload.depositoNameDestino = depDestino.name
        payload.depositoSiglaDestino = depDestino.sigla
     
        return payload
    }

    async ajustaSaldoDeposito(req, user, dto){

        let objMovimentacao = {
            id: dto.id, 

            capa: dto.capa,
            lote: {
                id: dto.loteId,
                code: dto.loteCodigo
            },

            item:{
                id: dto.id,
                itemId: dto.itemId,

                unidadeMedidaId: dto.unidadeMedidaId,
                unidadeMedidaCode: dto.unidadeMedidaCode,
                unidadeMedidaName: dto.unidadeMedidaName,
                unidadeMedidaSigla: dto.unidadeMedidaSigla,

                setorId: dto.setorId,
                setorName: dto.setorName,
                setorSigla: dto.setorSigla,
            },

            quantidadeEntregue: 0,
            quantidadeOrigemName: '*',
            quantidadeDestinoName: '*',

            origemRequisicaoName: 'DepositoInventarioItem'
        }

        objMovimentacao.quantidadeEntregue =  dto.quantidadeDisponivel
        objMovimentacao.quantidadeOrigemName =  'Disponivel'
        objMovimentacao.quantidadeDestinoName =  'Disponivel'
        objMovimentacao = dto.quantidadeDisponivel < 0 ? await this.ajustaDepositoMovimentacao(objMovimentacao, dto.depDestino, dto.depOrigem) : await this.ajustaDepositoMovimentacao(objMovimentacao, dto.depOrigem, dto.depDestino)
        if (dto.quantidadeDisponivel != 0) await this.depositoRequisicaoServ.movimentacao(req, user, objMovimentacao)

        objMovimentacao.quantidadeEntregue =  dto.quantidadeRequisitada
        objMovimentacao.quantidadeOrigemName =  'Requisitada'
        objMovimentacao.quantidadeDestinoName =  'Requisitada'
        objMovimentacao = dto.quantidadeRequisitada < 0 ? await this.ajustaDepositoMovimentacao(objMovimentacao, dto.depDestino, dto.depOrigem) : await this.ajustaDepositoMovimentacao(objMovimentacao, dto.depOrigem, dto.depDestino)
        if (dto.quantidadeRequisitada != 0) await this.depositoRequisicaoServ.movimentacao(req, user, objMovimentacao)

        objMovimentacao.quantidadeEntregue =  dto.quantidadeSeparada
        objMovimentacao.quantidadeOrigemName =  'Separada'
        objMovimentacao.quantidadeDestinoName =  'Separada'
        objMovimentacao = dto.quantidadeSeparada < 0 ? await this.ajustaDepositoMovimentacao(objMovimentacao, dto.depDestino, dto.depOrigem) : await this.ajustaDepositoMovimentacao(objMovimentacao, dto.depOrigem, dto.depDestino)
        if (dto.quantidadeSeparada != 0) await this.depositoRequisicaoServ.movimentacao(req, user, objMovimentacao)

    }

    async deleteInventario(req: CrudRequest, user: any, inventarioId: any): Promise<any>{   

        if (!inventarioId) return

        const itens = await this.repo.find({where:{depositoInventarioId: inventarioId, realmId: user.realmId}})

        let qtdExclusoes = 0
        for (let index = 0; index < itens.length; index++) {
            const item = itens[index];

            if (item['status'] == 'Excluido') qtdExclusoes = qtdExclusoes +1
            
            if (item['status'] != 'Pendente' || item.realmId != user.realmId) continue

            item.status = 'Excluido'

            await this.save(req, user, item)

            qtdExclusoes = qtdExclusoes +1
        }

        if (itens.length != qtdExclusoes) return {inventarioId: inventarioId}

        let inventario = await this.inventarioServ.getById(req, user, {id: inventarioId})
        if (!inventario) return

        if (inventario['status'] != 'Pendente') return {}

        inventario['status'] = 'Excluido'
        inventario['dataInicio'] = this.dataFormatada({data: inventario['dataInicio'], isDate: true, formato: 'YYYY-mm-dd'})

        await this.inventarioServ.save(req, user, inventario)

        return {inventarioId: inventarioId}
    }

}