
function getModuloSistema(obj: { code: any; name: any; description: string }){
    return { id: obj.code, code: obj.code,  name: obj.name, description: obj.description, type: 'CRUD'
    , created_at: new Date(), created_by: 0, updated_at: null, updated_by: null, deleted_at: null, deleted_by: null}
}

export const dataCrud: {id: number, code: string,            name: string, description: string, type: string
, created_at: Date, created_by: number, updated_at: Date, updated_by: number, deleted_at: Date, deleted_by: number}[] = [

    getModuloSistema({ code: 'produto',     name: 'Produto', description: 'Desenvolvimento, Planejamento e Acompanhamento de Produção'}),
    getModuloSistema({ code: 'comercial',   name: 'Comercial', description: 'Gestão de Clientes, Vendas e Logística'}),
    getModuloSistema({ code: 'suprimentos', name: 'Suprimentos', description: 'Gestão de Estoque, Compras e Almoxarifado'}),

    getModuloSistema({ code: 'financeiro',  name: 'Financeiro', description: 'Gestão de Contas a Pagar, Receber e Fluxo de Caixa'}),
    getModuloSistema({ code: 'fiscal',      name: 'Fiscal', description: 'Gestão da Escrituração, Faturamento e Obrigações Fiscais'}),
    getModuloSistema({ code: 'contabil',    name: 'Contábil', description: 'Gestão dos Lançamentos, Apuração e Obrigações Contábeis'}),
    
    getModuloSistema({ code: 'empresa',     name: 'Empresa', description: 'Gestão dos Pré-cadastros e Perfis de Acesso'})
]