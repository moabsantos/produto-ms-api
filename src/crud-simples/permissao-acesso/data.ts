
function getPermissaoAcesso(obj){
    return { id: obj.code, code: obj.code,  name: obj.name, description: '', type: 'CRUD'
    , created_at: new Date(), created_by: 0, updated_at: null, updated_by: null, deleted_at: null, deleted_by: null}
}

export const dataCrud: {id: number, code: string,            name: string, description: string, type: string
, created_at: Date, created_by: number, updated_at: Date, updated_by: number, deleted_at: Date, deleted_by: number}[] = [

    getPermissaoAcesso({code: 'sup-compr-adm', name: 'Compras - (Administração)', description: 'Gestão Geral sobre temas relacionados ao módulo de compras'}),

    getPermissaoAcesso({ code: 'sup-compr-negoc-dig',      name: 'Compras - Negociação (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-compr-ped-aprov',      name: 'Compras - Pedido de Compra (Aprovação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-compr-ped-dig',        name: 'Compras - Pedido de Compra (Digitaçao)', description: ''}),

    getPermissaoAcesso({ code: 'sup-almox-req-adm',        name: 'Almoxarifado - Gestão (Administração)', description: ''}),
    getPermissaoAcesso({ code: 'sup-almox-req-aprov',      name: 'Almoxarifado - Requisição (Aprovação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-almox-req-dig',        name: 'Almoxarifado - Requisição (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'sup-almox-req-aten',       name: 'Almoxarifado - Requisição (Atendimento)', description: ''}),

    getPermissaoAcesso({ code: 'com-vend-client-adm',      name: 'Comercial - Clientes (Administração)', description: ''}),
    getPermissaoAcesso({ code: 'com-vend-pedi-adm',        name: 'Comercial - Pedido de Venda (Administração)', description: ''}),
    getPermissaoAcesso({ code: 'com-vend-pedi-aprov',      name: 'Comercial - Pedido de Venda (Aprovação)', description: ''}),
    getPermissaoAcesso({ code: 'com-vend-pedi-dig',        name: 'Comercial - Pedido de Venda (Digitação)', description: ''}),

    getPermissaoAcesso({ code: 'prdt-desen-comp-dig',      name: 'Produto - Componentes da Ficha (Digitação)', description: ''}),
    getPermissaoAcesso({ code: 'prdt-prdc-ordem-dig',      name: 'Produto - Ordem de Produção (Digitação)', description: ''}),

    getPermissaoAcesso({ code: 'sis-sec-perm-adm', name: 'Gestão das Permissões (Administração)', description: ''}),
    getPermissaoAcesso({ code: 'sis-sec-perm-lib', name: 'Gestão das Permissões (Liberação)', description: ''}),

]