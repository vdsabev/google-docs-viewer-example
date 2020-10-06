import html from './html.js'

const documentApiUrl = '/api/document'
const getDocumentId = () => new URLSearchParams(location.search).get('id')

/** @type {(props: { id: string }) => HTMLIFrameElement}} */
const Document = ({ id }) => html`
  <iframe
    src="${documentApiUrl}/${id}"
    scrolling="no"
    onLoad=${(e) => {
      /** @type {HTMLIFrameElement} */ const iframe = e.target
      iframe.style.height = `${iframe.contentWindow.document.body.offsetHeight}px`
    }}
  />
`

document.querySelector('main').appendChild(Document({ id: getDocumentId() }))
