module.exports = {
  meta: {
    author: '',
    title: 'Extrapol',
    url: 'https://www.liberation.fr/apps/extrapol-2019',
    description: 'Chaque jour, de nouveaux Extras étaient à découvrir sur ExtraPol. Vous en avez raté un ? Retrouvez tous les anciens Extras publiés ici.',
    image: 'https://www.liberation.fr/apps/extrapol-2019/social.jpg',
    xiti_id: 'extrapol-frontpage'
  },
  tracking: {
    active: true,
    format: 'extrapol-frontpage',
    article: 'extrapol-frontpage'
  },
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : 'http://localhost:3003',
  api_url: process.env.NODE_ENV === 'production'
    ? 'https://libe-labo.site/api'
    : 'http://localhost:3004/api',
  stylesheet: 'extrapol.css', // The name of the css file hosted at ${statics_url}/styles/apps/
  spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTaKbvOSeCmlVZBiLQX8m4_tVQ1S4sZHjFovW91oW9KhQjLQI45gHgmjbRIiaS8rU0UcBHqLvfgWCFl/pub?gid=179824196&single=true&output=tsv'
}
