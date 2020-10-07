const { default: axios } = require('axios')
const http = require('lessttp')
const path = require('path')

const baseUrl = '/.netlify/functions'
const filename = path.parse(__filename).name

const getDocumentUrl = (/** @type {string} */ id) => {
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
    const { data: documentContent } = await axios.get(getDocumentUrl(id))
    return {
      body: documentContent,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    }
  },
})
