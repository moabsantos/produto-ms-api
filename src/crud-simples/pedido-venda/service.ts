import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/_shared/base-crud.service";

import { PedidoVenda } from "./crud.entity";
import { PedidoVendaUser } from "./crud-user.entity";
import { ClienteService } from "../cliente/service";
import { ClienteEstabelecimentoService } from "../cliente-estabelecimento/service";
import { PrioridadeService } from "../prioridade/service";
import { EmpresaService } from "../empresa/service";
import { FormaPagamentoService } from "../forma-pagamento/service";

export class PedidoVendaService extends BaseCrudService{

    empresa: any
    cliente: any
    estabelecimento: any
    formaPagamento: any
    prioridade: any

    constructor (
        @InjectRepository(PedidoVenda) protected repo,
        @InjectRepository(PedidoVendaUser) protected repoUser,
        private empresaServ: EmpresaService,
        private clienteServ: ClienteService,
        private estabelecimentoServ: ClienteEstabelecimentoService,
        private formaPagamentoServ: FormaPagamentoService,
        private prioridadeServ: PrioridadeService)
    {
        super(repo, repoUser)

        this.setRole({
            create: "com-pedido-venda-dig",
            update: "com-pedido-venda-dig",
            delete: "com-pedido-venda-dig",
            get: "com-pedido-venda-dig"
        })

        this.modelsRequired = [
            {fieldName: 'empresa', service: this.empresaServ, fields: ['id', 'name', 'sigla']},
            {fieldName: 'cliente', service: this.clienteServ, fields: ['id', 'name', 'sigla']},
            {fieldName: 'clienteEstabelecimento', service: this.estabelecimentoServ, fields: ['id', 'code', 'name']},
            {fieldName: '', service: this.estabelecimentoServ, fields:[
                'cnpj', 'inscricaoEstadual', 'email', 'telefone', 
                'endereco', 'numero', 'bairro',
                'cidadeId', 'cidadeName', 'cidadeSigla'], fieldKey: 'clienteEstabelecimentoId', optional: true},
            {fieldName: 'prioridade', service: this.prioridadeServ, fields: ['id', 'code', 'name', 'sequencia', 'cor']},
            {fieldName: 'formaPagamento', service: this.formaPagamentoServ, fields: ['id', 'code', 'name', 'sigla']}
        ]
    }

    getDataFromDto(dto: any, user: any, model: PedidoVenda){

        model = this.getModelFromInputs(model, dto, [
            'dataSolicitacao', 'quantidadeItens', 'valorDesconto', 'valorTotal'])

        model = this.getDataModelsFromDto(model)

        return super.getDataFromDto(dto, user, model)
    }


    async foundDuplicated(dto: any, user: any): Promise<boolean> {

        return this.foundDuplicatedCodeName(dto, user)
    }


    async validate(dto: any, user: any): Promise<boolean>{

        if (!this.validateFieldsRequireds([
            {name: "dataSolicitacao"}
        ], dto)) return false

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid) return false

        /*
        this.empresa = await this.validateId(this.empresaServ, dto.empresaId, user)
        if (!this.empresa){
            this.logger.error(`A Empresa ${dto.empresaId} não foi encontrada`)
            return false
        }

        this.cliente = await this.validateId(this.clienteServ, dto.clienteId, user)
        if (!this.cliente){
            this.logger.error(`O Cliente ${dto.clienteId} não foi encontrado`)
            return false
        }

        this.estabelecimento = await this.validateId(this.estabelecimentoServ, dto.clienteEstabelecimentoId, user)
        if (!this.estabelecimento){
            this.logger.error(`O Estabelecimento ${dto.clienteEstabelecimentoId} não foi encontrado`)
            return false
        }

        this.formaPagamento = await this.validateId(this.formaPagamentoServ, dto.formaPagamentoId, user)
        if (!this.formaPagamento){
            this.logger.error(`A Forma de Pagamento ${dto.formaPagamentoId} não foi encontrada`)
            return false
        }

        this.prioridade = await this.validateId(this.prioridadeServ, dto.prioridadeId, user)
        if (!this.prioridade){
            this.logger.error(`A prioridade ${dto.prioridadeId} não foi encontrada`)
            return false
        }
*/
        return super.validate(dto, user)
    }

}