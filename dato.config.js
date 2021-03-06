module.exports = (dato, root, i18n) => {
  root.createDataFile('pages.json', 'json', itemsToJson(dato.pages))
}

function itemsToJson (items) {
  return items.map(itemToJson)
}

function itemToJson (item) {
  const itemJson = item.toMap()
  const meta = itemJson.seoMetaTags
    .filter(tag => tag.tagName === 'meta')
    .map(tag => tag.attributes)
    .reduce((all, tag) => Object.assign(all, { [tag.name || tag.property]: tag.content }), {})

  itemJson.seo = Object.assign({
    'article:modified_time': meta['article:modified_time'],
    'article:publisher': meta['article:publisher'],
    'twitter:site': meta['twitter:site'],
  }, itemJson.seo || {})

  return removeSeoMetaTags(itemJson)
}

function removeSeoMetaTags (item) {
  item.seoMetaTags = []
  if(item.content) {
    item.content.forEach(item => item.seoMetaTags = [])
  }
  return item
}
