const BASE = {
  BACKEND : 'http://localhost:8080/'
}

export const URIS = {
usuarios:{
  login: BASE.BACKEND + 'api/usuarios/login'
},
quotes:{
  createQuote: BASE.BACKEND + 'api/quote',
  createQuoteDet: BASE.BACKEND + 'api/quote-detail',
  updateQuoteDet: BASE.BACKEND + 'api/quote-detail',
  generateQuote: BASE.BACKEND + 'api/quote-generate',
  getQuotes: BASE.BACKEND + 'api/quote-get',
  closeQuote: BASE.BACKEND + 'api/quote-close',
  closeQuoteRow: BASE.BACKEND + 'api/quote-close-row',
  deleteQuoteDet: BASE.BACKEND + 'api/quote-delete'

},
peso:{

  cpeso: BASE.BACKEND + 'api/quote-cpeso'

},

refs:{
  getRefs: BASE.BACKEND + 'api/refs-get'
}

}
