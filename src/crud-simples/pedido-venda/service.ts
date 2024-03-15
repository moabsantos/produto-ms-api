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


    async validate(dto: any, user: any): Promise<any>{

        const checkFields = this.validateFieldsRequireds([{name: "dataSolicitacao"}], dto)
        if (!checkFields.status) return checkFields

        const dtoValid = await this.validateModelsRequired(dto, user)
        if (!dtoValid.status) return dtoValid

        return super.validate(dto, user)
    }

}