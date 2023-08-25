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
            {fieldName: 'unidadeMedida', service: this.unidadeServ, fields: ['name', 'sigla', 'id', 'code'], getId: () => this['item'].unidadeMedidaId},
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
        if (!dtoValid) return false

        dto.name = 'REALM_'+ this['empresa'].realmId +'_EMP'+ this['empresa'].id +'_DEPINVENT_'+ this['depositoInventario'].id +'_DEP_'+ this['deposito'].id +'_ITEM_'+ dto.itemId +'_LOTE_'+ dto.loteId
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

        let filterSaldo = {
            realmId: inventario[0].realmId,
            empresaId: inventario[0].empresaId,
            depositoId: inventario[0].depositoId
        }

        let saldos = await this.saldoServ['repo'].find({where:{
            ...filterSaldo,
            itemGrupoId: 0
        }})

        for (let index = 0; index < saldos.length; index++) {
            const saldo = saldos[index];
            const item = await this.itemServ['repo'].find({where:{id: saldo.itemId, realmId: saldo.realmId}})

            if (item.length != 1) continue

            saldo.itemGrupoId = item[0].produtoGrupoId
            saldo.itemGrupoCode = item[0].produtoGrupoCode
            saldo.itemGrupoName = item[0].produtoGrupoName 
            saldo.itemGrupoSigla = item[0].produtoGrupoSigla

            await this.saldoServ['repo'].save({
                id: saldo.id,
                itemGrupoId: item[0].produtoGrupoId,
                itemGrupoCode: item[0].produtoGrupoCode,
                itemGrupoName: item[0].produtoGrupoName,
                itemGrupoSigla: item[0].produtoGrupoSigla  
            })
        }

        if (inventario[0].itemGrupoId) filterSaldo['itemGrupoId'] = inventario[0].itemGrupoId
        if (inventario[0].itemId && inventario[0].itemId != '0') filterSaldo['itemId'] = inventario[0].itemId
        if (inventario[0].itemPartialName) filterSaldo['itemName'] = Like(`%${inventario[0].itemPartialName}%`)

        saldos = await this.saldoServ['repo'].find({where:filterSaldo})

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

            if (Number(saldo.quantidadeDisponivel) >= 0) itemInventario['quantidadeImagem'] = Number(saldo.quantidadeDisponivel) + Number(saldos[0].quantidadeRequisitada) + Number(saldos[0].quantidadeSeparada)
            if (Number(saldo.quantidadeDisponivel) < 0) itemInventario['quantidadeImagem'] = Number(saldo.quantidadeDisponivel) - Number(saldos[0].quantidadeRequisitada) - Number(saldos[0].quantidadeSeparada)
            
            if (itemInventario['status'] == 'Excluido') itemInventario['status'] = 'Pendente'

            await this.save(req, user, itemInventario)
        }

        return {}

    }

    async iniciarInventario(req: CrudRequest, user: any, param: any): Promise<any>{

        if (!user.hasPermissao('sup-deposito-inventario-iniciar')) return
        
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

            await this.repo.save(i)
        }
        
        return {}

    }

    async informarContagem(req: CrudRequest, user: any, param: any): Promise<any>{

        if (!user.hasPermissao('sup-deposito-inventario-contagem')) return
        
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

            await this.repo.save(i)
        }
        
        return {}

    }


    async aplicarContagem(req: CrudRequest, user: any, param: any): Promise<any>{

        if (!user.hasPermissao('sup-deposito-inventario-processar')) return

        const inventario = await this.inventarioServ['repo'].find({where: {id: param.depositoInventarioId, realmId: user.realmId}})
        if (!inventario || inventario.length != 1) return {}

        if (inventario[0].status != 'Aprovado' && inventario[0].status != 'Em Contagem') return

        this.inventarioServ['repo'].save(inventario[0])

        const depContagem = await this.depositoServ['repo'].find({where:{realmId: inventario[0].realmId, id: inventario[0].depositoId}})
        if (!depContagem || depContagem.length != 1) return {}

        const depInventario = await this.depositoServ['repo'].find({where:{realmId: inventario[0].realmId, id: inventario[0].depositoInventarioId}})
        if (!depInventario || depInventario.length != 1) return {}

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

            let qtdAjuste = 0
            const qtdSaldo = Number(saldos[0].quantidadeDisponivel)
            const qtdContagem = Number(i.quantidadeContagem) - Number(saldos[0].quantidadeRequisitada) - Number(saldos[0].quantidadeSeparada)
            
            if (qtdSaldo < 0){
                qtdAjuste = qtdSaldo *-1
                qtdAjuste = qtdAjuste + qtdContagem
            }

            if (qtdSaldo >= 0){
                qtdAjuste = qtdContagem - qtdSaldo
            }

            if (qtdAjuste > 0){
                await this.ajustaSaldoDeposito(req, user, {
                    id: i.id,
                    capa: inventario[0],
                    loteId: i.loteId,
                    loteCodigo: i.loteCodigo,
                    itemId: i.itemId,
                    setorId: depContagem[0].setorId,
                    setorName: depContagem[0].setorName,
                    setorSigla: depContagem[0].setorSigla,
                    depOrigem: depInventario[0],
                    depDestino: depContagem[0],
                    quantidade: qtdAjuste,
                })
            }

            if (qtdAjuste < 0){
                await this.ajustaSaldoDeposito(req, user, {
                    id: i.id,
                    capa: inventario[0],
                    loteId: i.loteId,
                    loteCodigo: i.loteCodigo,
                    itemId: i.itemId,
                    setorId: depContagem[0].setorId,
                    setorName: depContagem[0].setorName,
                    setorSigla: depContagem[0].setorSigla,
                    depOrigem: depContagem[0],
                    depDestino: depInventario[0],
                    quantidade: qtdAjuste * -1,
                })
            }
            
            i.status = 'Finalizado'
            await this.repo.save(i)
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

    async ajustaSaldoDeposito(req, user, dto){
        
        await this.depositoRequisicaoServ.movimentacao(req, user, {
            id: dto.id, 

            capa: dto.capa,
            lote: {
                id: dto.loteId,
                code: dto.loteCodigo
            },

            item:{
                itemId: dto.itemId,
                setorId: dto.setorId,
                setorName: dto.setorName,
                setorSigla: dto.setorSigla,
            },

            quantidadeEntregue: dto.quantidade,

            depositoIdOrigem: dto.depOrigem.id,
            depositoCodeOrigem: dto.depOrigem.code,
            depositoNameOrigem: dto.depOrigem.name,
            depositoSiglaOrigem: dto.depOrigem.sigla,

            depositoIdDestino: dto.depDestino.id,
            depositoCodeDestino: dto.depDestino.code,
            depositoNameDestino: dto.depDestino.name,
            depositoSiglaDestino: dto.depDestino.sigla,

            quantidadeOrigemName: 'Disponivel',
            quantidadeDestinoName: 'Disponivel',

            origemRequisicaoName: 'DepositoInventarioItem'
        })

    }

}