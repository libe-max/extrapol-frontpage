module.exports = {
  meta: {
    author: '',
    title: 'Extrapol',
    url: 'https://www.liberation.fr/apps/extrapol-2019',
    description: '',
    image: '',
    xiti_id: 'extrapol-frontpage'
  },
  tracking: {
    active: true,
    format: 'extrapol-frontpage',
    article: 'extrapol-frontpage'
  },
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/statics'
    : 'http://localhost:3003',
  api_url: process.env.NODE_ENV === 'production'
    ? 'http://localhost:3004/api'
    : 'https://libe-labo.site/api',
  stylesheet: 'extrapol.css' // The name of the css file hosted at ${statics_url}/styles/apps/
}
