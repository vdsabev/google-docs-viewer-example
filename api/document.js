const http = require('./src/http')
const { get } = require('./src/request')
const baseUrl = '/.netlify/functions'
const filename = require('path').parse(__filename).name
const getDocumentUrl = (id) => {
  return `https://docs.google.com/document/d/e/${id}/pub?embedded=true`
}

// A simple proxy-like function that returns the document to get around iframe cross-origin security
exports.handler = http.function({
  request: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
  },
  path: `${baseUrl}/${filename}/:id`,
  async handler(request) {
    const { id } = request.params
    const { data: documentContent } = await get(getDocumentUrl(id))
    return {
      body: documentContent,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    }
  },
})
