const BASE = {
  BACKEND : 'http://localhost:8080/'
}

export const URIS = {
usuarios:{
  login: BASE.BACKEND + 'api/usuarios/login',
  updateUser: BASE.BACKEND + 'api/usuarios'
},
quotes:{
  createQuote: BASE.BACKEND + 'api/quote',
  createQuoteDet: BASE.BACKEND + 'api/quote-detail',
  updateQuoteDet: BASE.BACKEND + 'api/quote-detail',
  generateQuote: BASE.BACKEND + 'api/quote-generate',
  getQuotes: BASE.BACKEND + 'api/quote-get',
  closeQuote: BASE.BACKEND + 'api/quote-close',
  closeQuoteRow: BASE.BACKEND + 'api/quote-close-row',
  deleteQuoteDet: BASE.BACKEND + 'api/quote-delete',
  getTotalDto: BASE.BACKEND + 'api/quote-totaldto',
  getQuoteDetail: BASE.BACKEND +  'api/quote-detail',
  getIdQuotes: BASE.BACKEND + 'api/quotes',
  getBrands: BASE.BACKEND + 'api/brands'

},
peso:{

  cpeso: BASE.BACKEND + 'api/quote-cpeso'

},

refs:{
  getRefs: BASE.BACKEND + 'api/refs-get'
},

tablas:{
  getTabla: BASE.BACKEND + 'api/tables-get',
  postTools: BASE.BACKEND + 'api/tables-tools',
  updateTools: BASE.BACKEND + 'api/tables-uptools',
  getZonaProveedor: BASE.BACKEND + 'api/list-zp',
  updateListDetatil: BASE.BACKEND + 'api/tables-uplistdetail',
  updateCoin: BASE.BACKEND + 'api/tables-upcoin',
  updateParametro: BASE.BACKEND + 'api/tables-upparams',
  updateProveedor: BASE.BACKEND + 'api/tables-upbrands',
  updateRango: BASE.BACKEND + 'api/tables-uprangos',
  updateTarifa: BASE.BACKEND +'api/tables-uptarifas',
  updateTrm: BASE.BACKEND + 'api/tables-uptrm',
  updateVartarifas: BASE.BACKEND + 'api/tables-upvartarifas',
  updateZonaMoneda : BASE.BACKEND + 'api/tables-upzonamoneda',
  updateZonaProveedor : BASE.BACKEND + 'api/tables-upzonaproveedor',
  updateZonas : BASE.BACKEND +'api/tables-upzonas'
}

}
