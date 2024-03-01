const BASE = {
  //BACKEND : 'http://localhost:3005/'
  BACKEND : '/'

}

export const URIS = {
usuarios: {
  createUser: BASE.BACKEND + 'api/usuarios',
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
  getBrands: BASE.BACKEND + 'api/brands',
  getSellers: BASE.BACKEND + 'api/sellers',
  getCustomers: BASE.BACKEND + 'api/customers',
  putPDFDocument: BASE.BACKEND + 'api/quotes/pdf',
  rescue: BASE.BACKEND + 'api/rescue'

},
peso:{

  cpeso: BASE.BACKEND + 'api/quote-cpeso'

},

refs:{
  getRefs: BASE.BACKEND + 'api/refs-get'
},

tablas:{
  getTabla: BASE.BACKEND + 'api/tables-get',
  putTables: BASE.BACKEND + 'api/tables-upload'
  }

}
