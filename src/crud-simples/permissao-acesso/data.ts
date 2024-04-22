
function getPermissaoAcesso(obj){
    return { id: obj.code, code: obj.code,  name: obj.name, description: '', type: 'CRUD'
    , created_at: new Date(), created_by: 0, updated_at: null, updated_by: null, deleted_at: null, deleted_by: null}
}

export const dataCrud: {id: number, code: string,            name: string, description: string, type: string
, created_at: Date, created_by: number, updated_at: Date, updated_by: number, deleted_at: Date, deleted_by: number}[] = [

    getPermissaoAcesso({ code: 'sup-compra-adm', name: 'Compras - (Administração)', description: 'Gestão Geral sobre temas relacionados ao módulo de compras'}),
    
    getPermissaoAcesso({ code: 'sup-compra-ped-aprov',      name: 'Compras - Pedido de Compra (Aprovação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-compra-ped-dig',        name: 'Compras - Pedido de Compra (Digitaçao)', description: ''}),

    getPermissaoAcesso({ code: 'sup-compra-negoc-dig',      name: 'Compras - Negociação (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-compra-req-adm',        name: 'Requisição de Compra - (Administração)', description: ''}),
    getPermissaoAcesso({ code: 'sup-compra-req-aprov',      name: 'Requisição de Compra - (Aprovação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-compra-req-dig',        name: 'Requisição de Compra - (Digitação)', description: ''}),

    getPermissaoAcesso({ code: 'sup-almox-req-adm',        name: 'Almoxarifado - Gestão (Administração)', description: ''}),
    getPermissaoAcesso({ code: 'sup-almox-req-aprov',      name: 'Almoxarifado - Requisição (Aprovação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-almox-req-dig',        name: 'Almoxarifado - Requisição (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-almox-req-aten',       name: 'Almoxarifado - Requisição (Atendimento)', description: ''}),

    getPermissaoAcesso({ code: 'com-cliente-adm',      name: 'Comercial - Clientes (Administração)', description: ''}),
    getPermissaoAcesso({ code: 'com-cliente-dig',      name: 'Comercial - Clientes (Cadastro)', description: ''}),
    getPermissaoAcesso({ code: 'com-cliente-get',      name: 'Comercial - Clientes (Consulta)', description: ''}),
    getPermissaoAcesso({ code: 'com-cliente-estabelecimento-dig',      name: 'Comercial - Clientes / Estabelecimento (Cadastro)', description: ''}),
    getPermissaoAcesso({ code: 'com-cliente-estabelecimento-cons',      name: 'Comercial - Clientes / Estabelecimento (Consulta)', description: ''}),

    getPermissaoAcesso({ code: 'com-pedido-venda-adm',        name: 'Comercial - Pedido de Venda (Administração)', description: ''}),
    getPermissaoAcesso({ code: 'com-pedido-venda-aprov',      name: 'Comercial - Pedido de Venda (Aprovação)', description: ''}),
    getPermissaoAcesso({ code: 'com-pedido-venda-dig',        name: 'Comercial - Pedido de Venda (Digitação)', description: ''}),

    getPermissaoAcesso({ code: 'desen-prod-cad-dig',      name: 'Produto - Cadastro (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'desen-prod-cad-del',      name: 'Produto - Cadastro (Exclusão)', description: ''}),
    getPermissaoAcesso({ code: 'desen-prod-cad-cons',      name: 'Produto - Cadastro (Consulta)', description: ''}),

    getPermissaoAcesso({ code: 'prdt-desen-comp-dig',      name: 'Produto - Componentes da Ficha (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'prdt-prdc-ordem-dig',      name: 'Produto - Ordem de Produção (Digitação)', description: ''}),

    getPermissaoAcesso({ code: 'sup-deposito-inventario-dig',      name: 'Estoque - Inventário (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-deposito-inventario-iniciar',      name: 'Estoque - Inventário (Aprovar/Iniciar)', description: ''}),
    getPermissaoAcesso({ code: 'sup-deposito-inventario-contagem',      name: 'Estoque - Inventário (Informar Contagem)', description: ''}),
    getPermissaoAcesso({ code: 'sup-deposito-inventario-processar',      name: 'Estoque - Inventário (Aplicar Ajuste)', description: ''}),

    getPermissaoAcesso({ code: 'sis-sec-perm-adm', name: 'Gestão das Permissões (Administração)', description: ''}),
    getPermissaoAcesso({ code: 'sis-sec-perm-lib', name: 'Gestão das Permissões (Liberação)', description: ''}),


    getPermissaoAcesso({ code: 'sup-pedido-compra-contrato-dig',      name: 'Contas a Pagar - Documento (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-pedido-compra-contrato-get',      name: 'Contas a Pagar - Documento (Consulta)', description: ''}),
    
    
    getPermissaoAcesso({ code: 'custo-centro-custo-dig',      name: 'Custos - Centro de Custo (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'custo-centro-custo-get',      name: 'Custos - Centro de Custo (Consulta)', description: ''}),
        
    getPermissaoAcesso({ code: 'fin-tipo-documento-dig',      name: 'Financeiro - Tipo de Documento (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'fin-tipo-documento-get',      name: 'Financeiro - Tipo de Documento (Consulta)', description: ''}),
    getPermissaoAcesso({ code: 'fin-forma-pagamento-dig',      name: 'Financeiro - Forma de Pagamento (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'fin-forma-pagamento-get',      name: 'Financeiro - Forma de Pagamento (Consulta)', description: ''}),
    getPermissaoAcesso({ code: 'fin-despesa-financeira-dig',      name: 'Financeiro - Despesa Financeira (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'fin-despesa-financeira-get',      name: 'Financeiro - Despesa Financeira (Consulta)', description: ''}),
    getPermissaoAcesso({ code: 'fin-centro-financeiro-dig',      name: 'Financeiro - Centro Financeiro (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'fin-centro-financeiro-get',      name: 'Financeiro - Centro Financeiro (Consulta)', description: ''}),
    
    
    getPermissaoAcesso({ code: 'gestao-empresa-dig', name: 'Gestão - Empresa (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'gestao-empresa-get', name: 'Gestão - Empresa (Consulta)', description: ''}),
    getPermissaoAcesso({ code: 'gestao-setor-dig',      name: 'Gestão - Setor (Cadastro)', description: ''}),
    getPermissaoAcesso({ code: 'gestao-setor-get',      name: 'Gestão - Setor (Consulta)', description: ''}),

]