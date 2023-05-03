
import { Injectable } from "@nestjs/common";
import { CrudRequest } from "@nestjsx/crud";
import { CustosDia } from "src/crud-simples/custos-dia/crud.entity";
import { CustosDiaService } from "src/crud-simples/custos-dia/service";
import { CustosMensaisService } from "src/crud-simples/custos-mensais/service";

@Injectable()
export class CustosMensaisFacadeService {

    constructor (
        private custosDiaServ: CustosDiaService,
        private custosMesServ: CustosMensaisService)
    {}


    somaValidada(valores){

        return 0
    }

    async calculaCustoMesItem(req: CrudRequest, user: any, params: any){

        const custosDia = await this.custosDiaServ.findByWhere({
            empresaId: params.empresaId, 
            ano: params.ano, 
            mes: params.mes,
            itemDespesaId: params.itemDespesaId,
            setorId: params.setorId
        })

        let valores: any = {
            quantidadeRealizada: 0,
            quantidadePrevista: 0,
            valorRealizado: 0,
            valorPrevisto: 0
        }

        for await (const item of custosDia) {

            valores.quantidadeRealizada = valores.quantidadeRealizada + Number(item['quantidadeRealizada'])
            valores.quantidadePrevista = valores.quantidadePrevista + Number(item['quantidadePrevista'])
            valores.valorRealizado =  valores.valorRealizado + Number(item['valorRealizado'])
            valores.valorPrevisto = valores.valorPrevisto + Number(item['valorPrevisto'])

        }

        const custosMensais = await this.custosMesServ.findByWhere({
            empresaId: params.empresaId, 
            ano: params.ano, 
            mes: params.mes,
            itemDespesaId: params.itemDespesaId
        })

        let dtoCustosMensais: any;

        if (custosMensais.length > 0){
            dtoCustosMensais = custosMensais[0]
        }

        if (custosMensais.length > 1){
            for (let index = 1; index < custosMensais.length; index++) {
                const element = custosMensais[index];
                element['quantidadeRealizada'] = 0
                element['quantidadePrevista'] = 0
                element['valorPrevisto'] = 0
                element['valorRealizado'] = 0
                await this.custosMesServ.save(req, user, element)
            }
        }

        if ((custosMensais.length === 0) && (custosDia.length > 0)){
            dtoCustosMensais = custosDia[0]
            dtoCustosMensais.id = undefined
        }

        if (custosDia.length == 0){
            return {
                msgGeral: "Não foi encontrato Custo Lançado para o mês informado",
                data: []
            }
        }

        dtoCustosMensais['quantidadeRealizada'] = valores.quantidadeRealizada
        dtoCustosMensais['quantidadePrevista'] = valores.quantidadePrevista
        dtoCustosMensais['valorPrevisto'] = valores.valorPrevisto
        dtoCustosMensais['valorRealizado'] = valores.valorRealizado

        return this.custosMesServ.save(req, user, dtoCustosMensais)

    }

    async calculaCustoMes(req: CrudRequest, user: any, params: any): Promise<any>{

        const custosDia = await this.custosDiaServ.findByWhere({
            empresaId: params.empresaId, 
            ano: params.ano, 
            mes: params.mes})

        let itensProcessados: any = {}
        
        for await (const item of custosDia) {
            
            const keyItemSetor = item['itemDespesaId'] +'-'+ item['setorId']
            if (!itensProcessados[keyItemSetor]){

                await this.calculaCustoMesItem(req, user, {
                    empresaId: params.empresaId, 
                    ano: params.ano, 
                    mes: params.mes,
                    itemDespesaId: item['itemDespesaId'],
                    setorId: item['setorId']
                })

            }

            itensProcessados[keyItemSetor] = 1
        }

        return {
            msgGeral: "Cálculo Finalizado",
            data: []
        }

    }
}