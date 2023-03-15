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
  generateQuote: BASE.BACKEND + 'api/quote-generate',
  getQuotes: BASE.BACKEND + 'api/quote-get'
},
brands:{
  getBrands: BASE.BACKEND + 'api/brands-get'
},

refs:{
  getRefs: BASE.BACKEND + 'api/refs-get'
}

}
